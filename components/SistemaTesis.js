'use client'

import React, { useState, useRef } from 'react';
import { Upload, Download, Users, Calendar, FileText, BarChart3, CheckCircle, Clock, AlertCircle, User, GraduationCap } from 'lucide-react';

const SistemaTesis = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedFile, setSelectedFile] = useState(null);
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      grupo: 'Grupo 1',
      semana: 'Semana 1',
      estudiante: 'Melissa García',
      fecha: '2024-06-14',
      archivo: 'Formulacion_Titulo_Grupo1.pdf',
      comentarios: 'Primera versión del título de investigación',
      estado: 'new'
    },
    {
      id: 2,
      grupo: 'Grupo 1',
      semana: 'Semana 2',
      estudiante: 'Udo Martínez',
      fecha: '2024-06-21',
      archivo: 'Analisis_Titulo_Grupo1.pdf',
      comentarios: 'Análisis detallado del título propuesto',
      estado: 'downloaded'
    }
  ]);
  const [formData, setFormData] = useState({
    grupo: '',
    semana: '',
    estudiante: '',
    comentarios: ''
  });
  const [notification, setNotification] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const grupos = [
    { value: 'Grupo 1', label: 'Grupo 1 - Melissa, Udo, Angel' },
    { value: 'Grupo 2', label: 'Grupo 2 - María, Carlos, Luis' },
    { value: 'Grupo 3', label: 'Grupo 3 - Ana, Pedro, Sofia' }
  ];

  const semanas = [
    'Semana 1 - Formulación del Título',
    'Semana 2 - Análisis del Título',
    'Semana 3 - Objetivos',
    'Semana 4 - Marco Problemático',
    'Semana 5 - Marco Teórico (Antecedentes)',
    'Semana 6 - Marco Teórico (Bases Teóricas)',
    'Semana 7 - Hipótesis y Variables',
    'Semana 8 - Metodología',
    'Semana 9 - Presentación de Avance',
    'Semana 10 - Instrumentos de Recolección',
    'Semana 11 - Recolección de Datos',
    'Semana 12 - Análisis Estadístico',
    'Semana 13 - Resultados y Discusión',
    'Semana 14 - Conclusiones',
    'Semana 15 - Revisión y Correcciones',
    'Semana 16 - Entrega Final'
  ];

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleFileSelect = (file) => {
    const maxSize = 50 * 1024 * 1024; // 50MB
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (file.size > maxSize) {
      showNotification('❌ El archivo es demasiado grande. Máximo 50MB.', 'error');
      return;
    }
    
    if (!allowedTypes.includes(file.type)) {
      showNotification('❌ Tipo de archivo no válido. Solo PDF, DOC o DOCX.', 'error');
      return;
    }
    
    setSelectedFile(file);
    showNotification('✅ Archivo seleccionado correctamente', 'success');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      showNotification('❌ Por favor selecciona un archivo', 'error');
      return;
    }

    if (!formData.grupo || !formData.semana || !formData.estudiante) {
      showNotification('❌ Por favor completa todos los campos requeridos', 'error');
      return;
    }

    const newSubmission = {
      id: submissions.length + 1,
      ...formData,
      fecha: new Date().toISOString().split('T')[0],
      archivo: selectedFile.name,
      estado: 'new'
    };

    setSubmissions([...submissions, newSubmission]);
    setFormData({ grupo: '', semana: '', estudiante: '', comentarios: '' });
    setSelectedFile(null);
    showNotification('🎉 ¡Avance subido exitosamente!', 'success');
  };

  const handleDownload = (submission) => {
    // Simular descarga
    showNotification(`📥 Descargando ${submission.archivo}...`, 'success');
    setSubmissions(submissions.map(s => 
      s.id === submission.id ? { ...s, estado: 'downloaded' } : s
    ));
  };

  const getStats = () => {
    const totalSubmissions = submissions.length;
    const grupo1Submissions = submissions.filter(s => s.grupo === 'Grupo 1').length;
    const grupo2Submissions = submissions.filter(s => s.grupo === 'Grupo 2').length;
    const grupo3Submissions = submissions.filter(s => s.grupo === 'Grupo 3').length;
    
    return {
      total: totalSubmissions,
      grupo1Progress: Math.round((grupo1Submissions / 16) * 100),
      grupo2Progress: Math.round((grupo2Submissions / 16) * 100),
      grupo3Progress: Math.round((grupo3Submissions / 16) * 100)
    };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg font-semibold shadow-lg transform transition-all duration-300 ${
          notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
        }`}>
          {notification.message}
        </div>
      )}

      {/* Navbar */}
      <nav className="bg-black/30 backdrop-blur-lg border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-orange-500" />
              <span className="text-xl font-bold text-orange-500">Sistema Tesis UAP</span>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setActiveTab('upload')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  activeTab === 'upload' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Upload className="h-4 w-4 inline mr-2" />
                Subir Avance
              </button>
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  activeTab === 'admin' 
                    ? 'bg-orange-600 text-white' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <User className="h-4 w-4 inline mr-2" />
                Panel Profesor
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8 p-6 bg-orange-500/10 rounded-xl border border-orange-500/30">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-500 to-white bg-clip-text text-transparent">
            UNIVERSIDAD AUTÓNOMA DEL PERÚ
          </h1>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm opacity-80">Asesor de Tesis</p>
              <p className="font-semibold">Dr. Hugo Vega Huerta</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === 'upload' 
                ? 'bg-orange-500/20 text-orange-500 border border-orange-500/50' 
                : 'bg-white/5 text-white hover:bg-white/10'
            }`}
          >
            <Upload className="h-4 w-4 inline mr-2" />
            Subir Avance
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === 'admin' 
                ? 'bg-orange-500/20 text-orange-500 border border-orange-500/50' 
                : 'bg-white/5 text-white hover:bg-white/10'
            }`}
          >
            <User className="h-4 w-4 inline mr-2" />
            Panel Profesor
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === 'stats' 
                ? 'bg-orange-500/20 text-orange-500 border border-orange-500/50' 
                : 'bg-white/5 text-white hover:bg-white/10'
            }`}
          >
            <BarChart3 className="h-4 w-4 inline mr-2" />
            Estadísticas
          </button>
        </div>

        {/* Upload Section */}
        {activeTab === 'upload' && (
          <div className="bg-white/5 rounded-xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">
              📤 Subir Avance de Tesis
            </h2>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-orange-500 font-semibold mb-2">Grupo:</label>
                  <select
                    value={formData.grupo}
                    onChange={(e) => setFormData({...formData, grupo: e.target.value})}
                    className="w-full p-3 bg-gray-800 border border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Selecciona tu grupo</option>
                    {grupos.map(grupo => (
                      <option key={grupo.value} value={grupo.value}>{grupo.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-orange-500 font-semibold mb-2">Semana:</label>
                  <select
                    value={formData.semana}
                    onChange={(e) => setFormData({...formData, semana: e.target.value})}
                    className="w-full p-3 bg-gray-800 border border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Selecciona la semana</option>
                    {semanas.map(semana => (
                      <option key={semana} value={semana}>{semana}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-orange-500 font-semibold mb-2">Nombre del Estudiante:</label>
                <input
                  type="text"
                  value={formData.estudiante}
                  onChange={(e) => setFormData({...formData, estudiante: e.target.value})}
                  placeholder="Tu nombre completo"
                  className="w-full p-3 bg-gray-800 border border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-orange-500 font-semibold mb-2">Comentarios (opcional):</label>
                <textarea
                  value={formData.comentarios}
                  onChange={(e) => setFormData({...formData, comentarios: e.target.value})}
                  placeholder="Comentarios adicionales sobre el avance..."
                  rows="3"
                  className="w-full p-3 bg-gray-800 border border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-orange-500 font-semibold mb-2">
                  Archivo de Tesis (PDF, DOC, DOCX - Máx. 50MB):
                </label>
                <div
                  className={`border-3 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                    dragOver 
                      ? 'border-orange-500 bg-orange-500/10' 
                      : selectedFile 
                        ? 'border-green-500 bg-green-500/10' 
                        : 'border-orange-500/50 bg-orange-500/5 hover:border-orange-500 hover:bg-orange-500/10'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => e.target.files[0] && handleFileSelect(e.target.files[0])}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />
                  
                  {selectedFile ? (
                    <div className="text-green-400">
                      <CheckCircle className="h-12 w-12 mx-auto mb-4" />
                      <p className="text-lg font-semibold mb-2">📎 Archivo seleccionado</p>
                      <p className="text-sm opacity-80">
                        <strong>Nombre:</strong> {selectedFile.name}<br />
                        <strong>Tamaño:</strong> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div>
                      <Upload className="h-12 w-12 mx-auto mb-4 text-orange-500" />
                      <p className="text-lg font-semibold mb-2">📎 Arrastra tu archivo aquí o haz click</p>
                      <p className="text-sm opacity-80">Formatos: PDF, DOC, DOCX | Tamaño máximo: 50MB</p>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg font-bold text-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-105"
              >
                📤 Subir Avance de Tesis
              </button>
            </div>
          </div>
        )}

        {/* Admin Panel */}
        {activeTab === 'admin' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-orange-500 mb-2">👨‍🏫 Panel del Profesor</h2>
              <p className="opacity-80">Gestiona y descarga todos los avances de tesis</p>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-orange-500/20 rounded-lg">
                      <th className="text-left p-4 font-semibold">Archivo</th>
                      <th className="text-left p-4 font-semibold">Grupo</th>
                      <th className="text-left p-4 font-semibold">Estudiante</th>
                      <th className="text-left p-4 font-semibold">Semana</th>
                      <th className="text-left p-4 font-semibold">Fecha</th>
                      <th className="text-left p-4 font-semibold">Estado</th>
                      <th className="text-left p-4 font-semibold">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((submission) => (
                      <tr key={submission.id} className="bg-white/3 hover:bg-white/8 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-orange-500" />
                            <span className="text-sm">{submission.archivo}</span>
                          </div>
                        </td>
                        <td className="p-4">{submission.grupo}</td>
                        <td className="p-4">{submission.estudiante}</td>
                        <td className="p-4">{submission.semana.split(' - ')[0]}</td>
                        <td className="p-4">{submission.fecha}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            submission.estado === 'new' 
                              ? 'bg-orange-500/20 text-orange-500' 
                              : 'bg-green-500/20 text-green-500'
                          }`}>
                            {submission.estado === 'new' ? (
                              <>
                                <AlertCircle className="h-3 w-3 inline mr-1" />
                                Nuevo
                              </>
                            ) : (
                              <>
                                <CheckCircle className="h-3 w-3 inline mr-1" />
                                Descargado
                              </>
                            )}
                          </span>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => handleDownload(submission)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                          >
                            <Download className="h-4 w-4 inline mr-1" />
                            Descargar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {submissions.length === 0 && (
                <div className="text-center py-12 opacity-60">
                  <FileText className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg">No hay avances subidos aún</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Statistics */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-orange-500 mb-2">📊 Estadísticas del Proyecto</h2>
              <p className="opacity-80">Seguimiento del progreso general</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white/5 rounded-xl p-6 text-center border border-white/10">
                <div className="text-3xl font-bold text-orange-500 mb-2">16</div>
                <div className="opacity-80">Semanas Totales</div>
              </div>
              <div className="bg-white/5 rounded-xl p-6 text-center border border-white/10">
                <div className="text-3xl font-bold text-green-500 mb-2">{stats.total}</div>
                <div className="opacity-80">Avances Subidos</div>
              </div>
              <div className="bg-white/5 rounded-xl p-6 text-center border border-white/10">
                <div className="text-3xl font-bold text-blue-500 mb-2">{stats.grupo1Progress}%</div>
                <div className="opacity-80">Progreso Grupo 1</div>
              </div>
              <div className="bg-white/5 rounded-xl p-6 text-center border border-white/10">
                <div className="text-3xl font-bold text-purple-500 mb-2">{stats.grupo2Progress}%</div>
                <div className="opacity-80">Progreso Grupo 2</div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-orange-500 mb-4">📋 Cronograma de Entregas Importantes</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-white/3 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-sm font-bold">9</div>
                    <div>
                      <div className="font-semibold">Presentación de Avance</div>
                      <div className="text-sm opacity-70">Semana 9</div>
                    </div>
                  </div>
                  <div className="text-orange-500 font-semibold">5 Jun 2024</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/3 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-sm font-bold">16</div>
                    <div>
                      <div className="font-semibold">Entrega Final</div>
                      <div className="text-sm opacity-70">Semana 16</div>
                    </div>
                  </div>
                  <div className="text-green-500 font-semibold">Jul 2024</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SistemaTesis;
