import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Folder, BarChart3, Shield, Settings, Play, Pause, RefreshCw, HardDrive, Cpu, Wifi } from 'lucide-react';

export const ControlPanelSection: React.FC = React.memo(() => {
  const [activeTab, setActiveTab] = useState<'console' | 'files' | 'metrics' | 'backups' | 'startup'>('console');
  const [consoleInput, setConsoleInput] = useState('');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    '[17:42:01 INFO]: Preparing level "world"',
    '[17:42:02 INFO]: Preparing start region for level 0 (Seed: -48291038201)',
    '[17:42:03 INFO]: Time elapsed: 1420 ms',
    '[17:42:03 INFO]: Done (2.102s)! For help, type "help"',
    '[17:42:15 INFO]: [SenX-Shield] DDoS filter engaged • 0 malicious packets dropped',
    '[17:42:30 INFO]: Player "Steve" joined the game from 139.99.18.241 (12ms)',
  ]);

  const handleSendConsole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consoleInput.trim()) return;
    setConsoleLogs((prev) => [...prev, `> ${consoleInput}`, `[Console]: Command executed (${consoleInput})`]);
    setConsoleInput('');
  };

  return (
    <section id="panel" className="relative z-20 py-12 sm:py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3 sm:space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#111313] border border-white/10 text-xs font-mono text-[#A3E854]">
          <Terminal className="w-3.5 h-3.5" />
          <span>SENX GAME WINGS ENGINE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-inter text-[#F7F7F7]">
          Next-Gen <span className="text-[#A3E854]">Server Management.</span>
        </h2>
        <p className="text-xs sm:text-base font-inter text-white/60 leading-relaxed">
          A bespoke, ultra-fast control dashboard designed for low latency, live sub-second websocket streaming, and complete server authority.
        </p>
      </div>

      {/* Large Browser / Panel Mockup */}
      <div className="senx-glass p-2 sm:p-4 rounded-2xl sm:rounded-3xl border border-white/10 bg-[#111313]/90 shadow-2xl relative overflow-hidden">
        
        {/* Window Top Controls Bar */}
        <div className="px-3 py-2.5 sm:px-4 sm:py-3 bg-black/60 rounded-xl sm:rounded-2xl border border-white/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center justify-between sm:justify-start space-x-3">
            <div className="flex items-center space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-[#A3E854]" />
            </div>
            <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />
            <span className="text-[11px] sm:text-xs font-mono text-white/70 font-semibold truncate">
              panel.senxcloud.com/server/9f2a0b12
            </span>
          </div>

          {/* Horizontally Scrollable Tab Controls on Mobile */}
          <div className="flex items-center space-x-1 bg-white/5 p-1 rounded-xl border border-white/10 text-xs font-mono overflow-x-auto whitespace-nowrap touch-pan-x max-w-full">
            {[
              { id: 'console', label: 'Console', icon: Terminal },
              { id: 'files', label: 'File Manager', icon: Folder },
              { id: 'metrics', label: 'Resource Graphs', icon: BarChart3 },
              { id: 'backups', label: 'Backups', icon: Shield },
              { id: 'startup', label: 'Startup', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-2 min-h-[38px] rounded-lg flex items-center space-x-1.5 transition-all cursor-pointer shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-[#A3E854] text-[#050606] font-bold shadow-md shadow-[#A3E854]/20'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Display Area */}
        <div className="p-3.5 sm:p-6 rounded-xl sm:rounded-2xl bg-black/80 border border-white/[0.06] min-h-[380px] sm:min-h-[420px]">
          
          {/* TAB 1: CONSOLE */}
          {activeTab === 'console' && (
            <div className="flex flex-col h-full justify-between space-y-4">
              <div className="flex items-center justify-between pb-2.5 border-b border-white/10 text-[11px] sm:text-xs font-mono gap-2">
                <div className="flex items-center space-x-2">
                  <span className="text-[#A3E854] font-bold">ONLINE</span>
                  <span className="text-white/40 hidden sm:inline">• Node: BDIX</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="px-1.5 py-0.5 rounded bg-white/10 text-white/70 text-[10px]">25565</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#A3E854]/20 text-[#A3E854] text-[10px]">4ms</span>
                </div>
              </div>

              {/* Console Log Area */}
              <div className="font-mono text-[11px] sm:text-xs text-white/80 space-y-2 h-56 sm:h-64 overflow-y-auto pr-1">
                {consoleLogs.map((log, i) => (
                  <div key={i} className="leading-relaxed break-all">
                    <span className="text-[#A3E854]/80 mr-1.5">&gt;</span>
                    {log}
                  </div>
                ))}
              </div>

              {/* Command Input Bar */}
              <form onSubmit={handleSendConsole} className="flex items-center space-x-2 pt-2 border-t border-white/10">
                <span className="text-[#A3E854] font-mono text-sm font-bold">&gt;</span>
                <input
                  type="text"
                  placeholder="Type command (e.g. list, reload)..."
                  value={consoleInput}
                  onChange={(e) => setConsoleInput(e.target.value)}
                  className="flex-1 bg-transparent font-mono text-xs text-white focus:outline-none placeholder:text-white/30 py-2"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 min-h-[40px] rounded-xl bg-[#A3E854] text-[#050606] font-mono text-xs font-bold uppercase hover:bg-[#b5f26e] transition-colors cursor-pointer shrink-0"
                >
                  Send
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: FILE MANAGER */}
          {activeTab === 'files' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-white/50 pb-2 border-b border-white/10">
                <span>Directory: /home/container</span>
                <span>Size: 1.4 GB / 50 GB</span>
              </div>
              <div className="space-y-1">
                {[
                  { name: 'server.properties', size: '2.4 KB', type: 'Configuration' },
                  { name: 'paper.yml', size: '12.8 KB', type: 'Config' },
                  { name: 'spigot.yml', size: '8.1 KB', type: 'Config' },
                  { name: 'plugins/', size: '428 MB', type: 'Folder' },
                  { name: 'world/', size: '890 MB', type: 'Folder' },
                  { name: 'logs/latest.log', size: '1.2 MB', type: 'Log' },
                ].map((file, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#A3E854]/30 flex items-center justify-between text-white/80">
                    <div className="flex items-center space-x-2.5">
                      <Folder className="w-4 h-4 text-[#A3E854]" />
                      <span>{file.name}</span>
                    </div>
                    <div className="flex items-center space-x-6 text-white/40">
                      <span>{file.type}</span>
                      <span>{file.size}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: METRICS */}
          {activeTab === 'metrics' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-white/50">
                  <span className="flex items-center"><Cpu className="w-3.5 h-3.5 text-[#A3E854] mr-1.5" /> CPU UTILIZATION</span>
                  <span className="text-[#A3E854] font-bold">14.2%</span>
                </div>
                <div className="text-2xl font-black font-inter text-[#F7F7F7]">1.2 / 4 Cores</div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mt-2">
                  <div className="bg-[#A3E854] h-full" style={{ width: '14.2%' }} />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-white/50">
                  <span className="flex items-center"><HardDrive className="w-3.5 h-3.5 text-[#A3E854] mr-1.5" /> RAM USAGE</span>
                  <span className="text-[#A3E854] font-bold">2.8 GB</span>
                </div>
                <div className="text-2xl font-black font-inter text-[#F7F7F7]">2.8 / 8.0 GB</div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mt-2">
                  <div className="bg-[#A3E854] h-full" style={{ width: '35%' }} />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-white/50">
                  <span className="flex items-center"><Wifi className="w-3.5 h-3.5 text-[#A3E854] mr-1.5" /> NETWORK IO</span>
                  <span className="text-[#A3E854] font-bold">10 Gbps</span>
                </div>
                <div className="text-2xl font-black font-inter text-[#F7F7F7]">48 MB/s In</div>
                <div className="text-xs font-mono text-white/40">112 MB/s Out</div>
              </div>
            </div>
          )}

          {/* TAB 4: BACKUPS */}
          {activeTab === 'backups' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-white/10 text-white/50">
                <span>AUTOMATED SNAPSHOTS</span>
                <button className="px-3 py-1.5 rounded-xl bg-[#A3E854] text-[#050606] font-bold">Create Snapshot Now</button>
              </div>
              {[
                { name: 'backup-2026-07-21-0400.tar.gz', size: '1.2 GB', created: '3 hours ago', status: 'Completed' },
                { name: 'backup-2026-07-20-0400.tar.gz', size: '1.2 GB', created: '1 day ago', status: 'Completed' },
                { name: 'backup-2026-07-19-0400.tar.gz', size: '1.1 GB', created: '2 days ago', status: 'Completed' },
              ].map((b, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-white/80">
                  <div>
                    <div className="font-bold text-[#F7F7F7]">{b.name}</div>
                    <div className="text-[10px] text-white/40">{b.created} • {b.size}</div>
                  </div>
                  <button className="px-3 py-1 rounded-lg bg-white/10 text-xs text-white hover:text-[#A3E854]">Restore</button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: STARTUP */}
          {activeTab === 'startup' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                <label className="text-white/50 block">JAVA STARTUP COMMAND</label>
                <div className="p-3 bg-black/80 rounded-lg text-[#A3E854] text-[11px] overflow-x-auto">
                  java -Xms1024M -Xmx4096M -XX:+UseG1GC -XX:+ParallelRefProcEnabled -jar server.jar nogui
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                <label className="text-white/50 block">SERVER JAR FILE</label>
                <input type="text" defaultValue="paper-1.21.8.jar" className="w-full bg-black/80 p-2.5 rounded-lg border border-white/10 text-white" />
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
});
