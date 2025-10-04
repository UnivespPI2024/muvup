import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore/lite';
import ReactMarkdown from 'react-markdown';

const RelatorioSaude = ({ perfil }) => {
  const [healthData, setHealthData] = useState([]);
  const [selectedLog, setSelectedLog] = useState(null);
  const [relatorioDiario, setRelatorioDiario] = useState("");
  const [relatorioGeral, setRelatorioGeral] = useState("");
  const [isLoadingDiario, setIsLoadingDiario] = useState(false);
  const [isLoadingGeral, setIsLoadingGeral] = useState(false);

  useEffect(() => {
    const fetchHealthData = async () => {
      const healthCollection = query(collection(db, 'healthData'), orderBy('createdAt', 'desc'));
      const healthSnapshot = await getDocs(healthCollection);
      const data = healthSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setHealthData(data);
    };
    fetchHealthData();
  }, []);

  const handleLogClick = (log) => {
    setSelectedLog(log);
    setRelatorioDiario("");
  };

  const generateReportAPI = async (data) => {
    try {
      const response = await fetch('/.netlify/functions/generateReport', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Falha ao gerar o relatório.');
      }
      const result = await response.json();
      return result.report;
    } catch (error) {
      console.error(error);
      return "Ocorreu um erro ao gerar o relatório. Tente novamente.";
    }
  };

  const handleGerarRelatorioDiario = async () => {
    if (!selectedLog) return;
    setIsLoadingDiario(true);
    const summary = {
      date: new Date(selectedLog.createdAt.seconds * 1000).toLocaleDateString(),
      totalSteps: calculateTotalSteps(selectedLog.steps),
      averageBPM: calculateAverageBPM(selectedLog.heartRates),
      calories: selectedLog.calories
    };
    const report = await generateReportAPI(summary);
    setRelatorioDiario(report);
    setIsLoadingDiario(false);
  };

  const handleGerarRelatorioGeral = async () => {
    if (healthData.length === 0) return;
    setIsLoadingGeral(true);
    setRelatorioGeral("");
    const summary = healthData.map(log => ({
      date: new Date(log.createdAt.seconds * 1000).toLocaleDateString(),
      totalSteps: calculateTotalSteps(log.steps),
      averageBPM: calculateAverageBPM(log.heartRates),
      calories: log.calories
    }));
    const report = await generateReportAPI(summary);
    setRelatorioGeral(report);
    setIsLoadingGeral(false);
  };
  
  const calculateTotalSteps = (stepsArray) => {
    if (!Array.isArray(stepsArray)) return 0;
    return stepsArray.reduce((total, current) => total + (current.count || 0), 0);
  };
  
  const calculateAverageBPM = (heartRatesArray) => {
    if (!Array.isArray(heartRatesArray) || heartRatesArray.length === 0) return 0;
    const totalBPM = heartRatesArray.reduce((total, current) => total + (current.bpm || 0), 0);
    return parseInt((totalBPM / heartRatesArray.length).toFixed(0));
  };

  return (
    <div className='cadastroContainer' style={{ width: '100%' }}>
      <div className='listContainer' style={{ marginBottom: '20px' }}>
        <h3 className={'texto'}>Visão Geral</h3>
        {perfil === 'aluno' && (
          <button className={'btnCadastrar'} onClick={handleGerarRelatorioGeral} disabled={isLoadingGeral || healthData.length === 0}>
            {isLoadingGeral ? 'Gerando Relatório Geral...' : 'Gerar Relatório Geral com IA'}
          </button>
        )}
        {relatorioGeral && (
          <div className={'item'} style={{ marginTop: '10px' }}>
            <h4 className={'textoPequeno'}>Relatório Consolidado:</h4>
            <div className={'textoPequeno'}><ReactMarkdown>{relatorioGeral}</ReactMarkdown></div>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: '100%' }}>
        <div className='listContainer' style={{ flex: 1, marginRight: '20px' }}>
          <h3 className={'texto'}>Registros Diários</h3>
          {healthData.map(log => (
            <li key={log.id} className={'item'} style={{ cursor: 'pointer', backgroundColor: selectedLog?.id === log.id ? '#e0e0e0' : 'transparent' }} onClick={() => handleLogClick(log)}>
              Data: {new Date(log.createdAt.seconds * 1000).toLocaleString()}
            </li>
          ))}
        </div>

        <div style={{ flex: 2 }}>
          {selectedLog ? (
            <div className='listContainer'>
              <h3 className={'texto'}>Detalhes do Registro</h3>
              <div className={'item'}>
                <p><strong>Data:</strong> {new Date(selectedLog.createdAt.seconds * 1000).toLocaleString()}</p>
                <p><strong>Total de Passos:</strong> {calculateTotalSteps(selectedLog.steps)}</p>
                <p><strong>Média de Batimentos Cardíacos:</strong> {calculateAverageBPM(selectedLog.heartRates)} bpm</p>
                <p><strong>Calorias:</strong> {selectedLog.calories || 'N/A'}</p>
              </div>

              {perfil === 'aluno' && (
                <button className={'btnCadastrar'} onClick={handleGerarRelatorioDiario} disabled={isLoadingDiario}>
                  {isLoadingDiario ? 'Gerando...' : 'Gerar Relatório do Dia'}
                </button>
              )}

              {relatorioDiario && (
                <div className={'item'} style={{ marginTop: '10px' }}>
                   <h4 className={'textoPequeno'}>Relatório do Dia:</h4>
                   <div className={'textoPequeno'}><ReactMarkdown>{relatorioDiario}</ReactMarkdown></div>
                </div>
              )}
            </div>
          ) : (
            <p className={'texto'}>Selecione um registro na lista para ver os detalhes.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RelatorioSaude;