import React, { useState } from 'react';
import { 
  AlertTriangle, Shield, CheckCircle, Clock, AlertOctagon, 
  Search, Plus, Filter, Download, Info, Flame, Eye, ChevronRight, X
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterZone, setFilterZone] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const [findings, setFindings] = useState([
    {
      id: 'HAZ-2026-001',
      tag: 'MOT-102-PUMP',
      area: 'Planta Procesamiento - Compresores',
      standard: 'ATEX',
      zone: 'Zona 1',
      gasGroup: 'IIC (Hidrógeno/Acetileno)',
      tempClass: 'T4 (135°C)',
      severity: 'Crítica',
      status: 'Pendiente',
      description: 'Prensaestopas de caja de conexiones Ex d suelto con pérdida de hermeticidad.',
      recommendation: 'Reemplazo inmediato de prensaestopas certificado Ex d IIC Mb/Gb.',
      date: '2026-10-20',
      inspector: 'Ing. R. Gómez'
    },
    {
      id: 'HAZ-2026-002',
      tag: 'XMIT-405-FLOW',
      area: 'Tanques de Almacenamiento',
      standard: 'NEC 500',
      zone: 'Clase I, Div 1',
      gasGroup: 'Grupo B',
      tempClass: 'T3 (200°C)',
      severity: 'Alta',
      status: 'En Reparación',
      description: 'Sello cortafuego faltante a menos de 45 cm de la envolvente Ex d.',
      recommendation: 'Instalación de accesorio sellador con compuesto Chicagoland Ex.',
      date: '2026-10-22',
      inspector: 'Téc. M. Silva'
    },
    {
      id: 'HAZ-2026-003',
      tag: 'LGT-301-AREA',
      area: 'Almacén de Reactivos',
      standard: 'ATEX',
      zone: 'Zona 21',
      gasGroup: 'IIIC (Polvos conductores)',
      tempClass: 'T125°C',
      severity: 'Media',
      status: 'Cerrado',
      description: 'Acumulación de polvo de azufre sobre luminaria Ex tb mayor a 5mm.',
      recommendation: 'Limpieza programada y revisión de sello IP6X.',
      date: '2026-10-18',
      inspector: 'Ing. R. Gómez'
    }
  ]);

  const [newFinding, setNewFinding] = useState({
    tag: '', area: '', standard: 'ATEX', zone: 'Zona 1', gasGroup: 'IIC',
    tempClass: 'T4', severity: 'Alta', status: 'Pendiente', description: '', recommendation: '', inspector: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const created = {
      ...newFinding,
      id: `HAZ-2026-00${findings.length + 1}`,
      date: new Date().toISOString().split('T')[0]
    };
    setFindings([created, ...findings]);
    setShowModal(false);
    setNewFinding({
      tag: '', area: '', standard: 'ATEX', zone: 'Zona 1', gasGroup: 'IIC',
      tempClass: 'T4', severity: 'Alta', status: 'Pendiente', description: '', recommendation: '', inspector: ''
    });
  };

  const filteredFindings = findings.filter(item => {
    const matchesSearch = item.tag.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.area.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || item.status === filterStatus;
    const matchesZone = filterZone === 'ALL' || item.zone.includes(filterZone);
    return matchesSearch && matchesStatus && matchesZone;
  });

  const getSeverityBadge = (sev) => {
    switch (sev) {
      case 'Crítica': return 'bg-red-900/40 text-red-400 border-red-700/50';
      case 'Alta': return 'bg-orange-900/40 text-orange-400 border-orange-700/50';
      case 'Media': return 'bg-yellow-900/40 text-yellow-400 border-yellow-700/50';
      default: return 'bg-blue-900/40 text-blue-400 border-blue-700/50';
    }
  };

  const getStatusBadge = (st) => {
    switch (st) {
      case 'Pendiente': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'En Reparación': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Cerrado': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/20 rounded-xl border border-amber-500/40">
            <Flame className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-500 bg-clip-text text-transparent">
              HAZLOC Inspector Pro
            </h1>
            <p className="text-xs text-slate-400">Gestión de Hallazgos en Zonas Clasificadas Ex / ATEX / NEC</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 px-4 py-2 rounded-lg font-semibold text-sm transition-all shadow-lg shadow-amber-500/20"
          >
            <Plus className="w-4 h-4" /> Nuevo Hallazgo
          </button>
        </div>
      </header>

      <div className="bg-slate-900/80 border-b border-slate-800 px-6 flex gap-6 text-sm font-medium">
        {['dashboard', 'hallazgos', 'cheat-sheet'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 border-b-2 transition-colors capitalize ${
              activeTab === tab ? 'border-amber-400 text-amber-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab === 'cheat-sheet' ? 'Guía Técnica Ex' : tab}
          </button>
        ))}
      </div>

      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center gap-4">
                <div className="p-3 bg-red-500/10 rounded-lg text-red-400"><AlertOctagon className="w-6 h-6" /></div>
                <div><p className="text-xs text-slate-400">Críticos</p><p className="text-2xl font-bold text-red-400">{findings.filter(f=>f.severity==='Crítica').length}</p></div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center gap-4">
                <div className="p-3 bg-orange-500/10 rounded-lg text-orange-400"><Clock className="w-6 h-6" /></div>
                <div><p className="text-xs text-slate-400">Pendientes</p><p className="text-2xl font-bold text-orange-400">{findings.filter(f=>f.status==='Pendiente').length}</p></div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center gap-4">
                <div className="p-3 bg-amber-500/10 rounded-lg text-amber-400"><AlertTriangle className="w-6 h-6" /></div>
                <div><p className="text-xs text-slate-400">En Reparación</p><p className="text-2xl font-bold text-amber-400">{findings.filter(f=>f.status==='En Reparación').length}</p></div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center gap-4">
                <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400"><CheckCircle className="w-6 h-6" /></div>
                <div><p className="text-xs text-slate-400">Cerrados</p><p className="text-2xl font-bold text-emerald-400">{findings.filter(f=>f.status==='Cerrado').length}</p></div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-200">
                <Shield className="w-5 h-5 text-amber-400" /> Resumen de Inspecciones Ex
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-950/60 text-slate-400 text-xs uppercase border-b border-slate-800">
                    <tr>
                      <th className="p-3">TAG / ID</th>
                      <th className="p-3">Clasificación HAZLOC</th>
                      <th className="p-3">Severidad</th>
                      <th className="p-3">Estado</th>
                      <th className="p-3">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {findings.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-3 font-mono text-amber-400 font-semibold">{item.tag}<div className="text-xs text-slate-500">{item.id}</div></td>
                        <td className="p-3"><span className="text-slate-200">{item.zone}</span> <span className="text-xs text-slate-500">({item.gasGroup} - {item.tempClass})</span></td>
                        <td className="p-3"><span className={`px-2 py-0.5 rounded text-xs border ${getSeverityBadge(item.severity)}`}>{item.severity}</span></td>
                        <td className="p-3"><span className={`px-2 py-0.5 rounded text-xs border ${getStatusBadge(item.status)}`}>{item.status}</span></td>
                        <td className="p-3"><button onClick={() => setSelectedItem(item)} className="p-1.5 hover:bg-slate-700 rounded text-slate-300"><Eye className="w-4 h-4" /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'hallazgos' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
              <div className="flex-1 min-w-[240px] relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Buscar por TAG, área o descripción..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-amber-500"
              >
                <option value="ALL">Todos los Estados</option>
                <option value="Pendiente">Pendiente</option>
                <option value="En Reparación">En Reparación</option>
                <option value="Cerrado">Cerrado</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFindings.map((item) => (
                <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="font-mono text-xs text-amber-400 font-bold">{item.tag}</span>
                        <h3 className="text-base font-semibold text-slate-100">{item.area}</h3>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-xs border ${getSeverityBadge(item.severity)}`}>{item.severity}</span>
                    </div>
                    <p className="text-sm text-slate-300 line-clamp-2 mb-4">{item.description}</p>
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 mb-4 text-xs space-y-1">
                      <div className="text-slate-400"><span className="text-slate-500">Zona:</span> {item.zone}</div>
                      <div className="text-slate-400"><span className="text-slate-500">Grupo/Temp:</span> {item.gasGroup} | {item.tempClass}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-slate-800 text-xs">
                    <span className={`px-2 py-0.5 rounded border ${getStatusBadge(item.status)}`}>{item.status}</span>
                    <button onClick={() => setSelectedItem(item)} className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium">Ver Detalle <ChevronRight className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cheat-sheet' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
            <h2 className="text-lg font-bold text-amber-400 flex items-center gap-2">
              <Info className="w-5 h-5" /> Guía Técnica Ex - Clasificación de Zonas Peligrosas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h3 className="font-bold text-slate-200 mb-2 text-sm">Gases y Vapores (IECEx / ATEX vs NEC)</h3>
                <ul className="text-xs text-slate-400 space-y-2">
                  <li><strong className="text-amber-400">Zona 0 / Div 1:</strong> Presencia continua o por largos períodos de atmósfera explosiva.</li>
                  <li><strong className="text-amber-400">Zona 1 / Div 1:</strong> Probable presencia en condiciones normales de operación.</li>
                  <li><strong className="text-amber-400">Zona 2 / Div 2:</strong> Poco probable o por breves períodos.</li>
                </ul>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h3 className="font-bold text-slate-200 mb-2 text-sm">Clases de Temperatura (Max Superficie)</h3>
                <div className="grid grid-cols-3 gap-2 text-xs text-center">
                  <div className="bg-slate-900 p-2 rounded border border-slate-800"><div className="text-amber-400 font-bold">T1</div><div className="text-slate-500">450°C</div></div>
                  <div className="bg-slate-900 p-2 rounded border border-slate-800"><div className="text-amber-400 font-bold">T2</div><div className="text-slate-500">300°C</div></div>
                  <div className="bg-slate-900 p-2 rounded border border-slate-800"><div className="text-amber-400 font-bold">T3</div><div className="text-slate-500">200°C</div></div>
                  <div className="bg-slate-900 p-2 rounded border border-slate-800"><div className="text-amber-400 font-bold">T4</div><div className="text-slate-500">135°C</div></div>
                  <div className="bg-slate-900 p-2 rounded border border-slate-800"><div className="text-amber-400 font-bold">T5</div><div className="text-slate-500">100°C</div></div>
                  <div className="bg-slate-900 p-2 rounded border border-slate-800"><div className="text-amber-400 font-bold">T6</div><div className="text-slate-500">85°C</div></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal Nuevo Hallazgo */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800 mb-4">
              <h3 className="text-lg font-bold text-slate-100">Nuevo Hallazgo HAZLOC</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">TAG Equipo</label>
                  <input required type="text" placeholder="Ej: PUMP-201" value={newFinding.tag} onChange={e=>setNewFinding({...newFinding, tag: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-100" />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Área / Ubicación</label>
                  <input required type="text" placeholder="Ej: Planta Compresores" value={newFinding.area} onChange={e=>setNewFinding({...newFinding, area: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-100" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Estándar</label>
                  <select value={newFinding.standard} onChange={e=>setNewFinding({...newFinding, standard: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-100">
                    <option value="ATEX">ATEX / IECEx</option>
                    <option value="NEC 500">NEC 500</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Zona / Div</label>
                  <select value={newFinding.zone} onChange={e=>setNewFinding({...newFinding, zone: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-100">
                    <option value="Zona 0">Zona 0</option>
                    <option value="Zona 1">Zona 1</option>
                    <option value="Zona 2">Zona 2</option>
                    <option value="Clase I, Div 1">Clase I, Div 1</option>
                    <option value="Clase I, Div 2">Clase I, Div 2</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Clase Temp.</label>
                  <select value={newFinding.tempClass} onChange={e=>setNewFinding({...newFinding, tempClass: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-100">
                    <option value="T1">T1 (450°C)</option>
                    <option value="T2">T2 (300°C)</option>
                    <option value="T3">T3 (200°C)</option>
                    <option value="T4">T4 (135°C)</option>
                    <option value="T5">T5 (100°C)</option>
                    <option value="T6">T6 (85°C)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Descripción de la Desviación</label>
                <textarea required rows={3} value={newFinding.description} onChange={e=>setNewFinding({...newFinding, description: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-100"></textarea>
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-800 rounded-lg text-sm text-slate-400">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-sm">Guardar Hallazgo</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Detalle */}
      {selectedItem && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-lg p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <span className="font-mono text-xs text-amber-400">{selectedItem.id}</span>
                <h3 className="text-lg font-bold text-slate-100">{selectedItem.tag}</h3>
              </div>
              <button onClick={() => setSelectedItem(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-slate-500">Área:</span> {selectedItem.area}</div>
                <div><span className="text-slate-500">Clasificación:</span> {selectedItem.zone}</div>
                <div><span className="text-slate-500">Grupo:</span> {selectedItem.gasGroup}</div>
                <div><span className="text-slate-500">Temp:</span> {selectedItem.tempClass}</div>
              </div>
              <div>
                <strong className="text-xs text-slate-400 block mb-1">Descripción:</strong>
                <p className="text-slate-200 bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs">{selectedItem.description}</p>
              </div>
              <div>
                <strong className="text-xs text-slate-400 block mb-1">Recomendación / Acción:</strong>
                <p className="text-amber-300 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20 text-xs">{selectedItem.recommendation}</p>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button onClick={() => setSelectedItem(null)} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-slate-200">Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}