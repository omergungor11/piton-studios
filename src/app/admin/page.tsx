'use client';

import { useState } from 'react';
import Link from 'next/link';

type Tab = 'projects' | 'gallery' | 'services' | 'messages' | 'settings';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('projects');

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'projects', label: 'Projects', icon: '◻' },
    { id: 'gallery', label: 'Gallery', icon: '◫' },
    { id: 'services', label: 'Services', icon: '⬡' },
    { id: 'messages', label: 'Messages', icon: '✉' },
    { id: 'settings', label: 'Settings', icon: '⚙' },
  ];

  return (
    <div className="admin">
      <div className="grain" />
      <div className="page-bg" />

      {/* Sidebar */}
      <aside className="admin-sidebar glass">
        <div className="admin-logo">
          <span className="mark-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
          <span>Piton Studios</span>
        </div>
        <nav className="admin-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`admin-nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="admin-nav-icon">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <Link href="/" className="admin-back">← Site&apos;ye D&#246;n</Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="admin-main">
        <header className="admin-header">
          <h1 className="admin-page-title">
            {tabs.find((t) => t.id === activeTab)?.label}
          </h1>
          <div className="admin-header-actions">
            {(activeTab === 'projects' || activeTab === 'gallery' || activeTab === 'services') && (
              <button className="admin-btn primary">+ Yeni Ekle</button>
            )}
          </div>
        </header>

        <div className="admin-content">
          {activeTab === 'projects' && <ProjectsPanel />}
          {activeTab === 'gallery' && <GalleryPanel />}
          {activeTab === 'services' && <ServicesPanel />}
          {activeTab === 'messages' && <MessagesPanel />}
          {activeTab === 'settings' && <SettingsPanel />}
        </div>
      </main>
    </div>
  );
}

function ProjectsPanel() {
  const projects = [
    { title: 'Polaris', client: 'Polaris Films', year: '2025', type: 'work', published: true },
    { title: 'Meridian', client: 'Meridian Coffee', year: '2025', type: 'work', published: true },
    { title: 'Red Knight', client: 'Confidential', year: '2025', type: 'story', published: true },
    { title: 'Halcyon', client: 'Halcyon Hotels', year: '2024', type: 'work', published: true },
    { title: 'Night Cut', client: '—', year: '2025', type: 'story', published: false },
  ];
  return (
    <div className="admin-table-wrap glass">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Client</th>
            <th>Year</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.title}>
              <td className="admin-cell-title">{p.title}</td>
              <td>{p.client}</td>
              <td>{p.year}</td>
              <td><span className="admin-badge">{p.type}</span></td>
              <td><span className={`admin-status ${p.published ? 'on' : 'off'}`}>{p.published ? 'Published' : 'Draft'}</span></td>
              <td className="admin-actions">
                <button className="admin-btn-sm">Edit</button>
                <button className="admin-btn-sm danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GalleryPanel() {
  return (
    <div className="admin-grid-wrap">
      <div className="admin-upload-zone glass">
        <div className="admin-upload-icon">+</div>
        <p>Drag & drop images here</p>
        <p className="admin-upload-sub">or click to browse</p>
      </div>
      <div className="admin-gallery-grid">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="admin-gallery-item glass">
            <div className="admin-gallery-thumb" />
            <div className="admin-gallery-info">
              <span>Image {i}</span>
              <button className="admin-btn-sm danger">×</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServicesPanel() {
  const services = [
    { n: '01', title: 'Web Design', cat: 'Design' },
    { n: '02', title: 'Web App', cat: 'Build' },
    { n: '03', title: 'Mobile App', cat: 'Build' },
    { n: '04', title: 'AI Integration', cat: 'AI' },
  ];
  return (
    <div className="admin-table-wrap glass">
      <table className="admin-table">
        <thead>
          <tr><th>#</th><th>Title</th><th>Category</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {services.map((s) => (
            <tr key={s.n}>
              <td>{s.n}</td>
              <td className="admin-cell-title">{s.title}</td>
              <td><span className="admin-badge">{s.cat}</span></td>
              <td className="admin-actions">
                <button className="admin-btn-sm">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MessagesPanel() {
  const messages = [
    { name: 'Ahmet Y.', email: 'ahmet@example.com', message: 'Web sitemiz için teklif almak istiyoruz.', date: '2025-04-18', read: false },
    { name: 'Elif K.', email: 'elif@example.com', message: 'Brand identity projesi hakkında görüşmek istiyorum.', date: '2025-04-17', read: true },
  ];
  return (
    <div className="admin-messages">
      {messages.map((m, i) => (
        <div key={i} className={`admin-message glass ${!m.read ? 'unread' : ''}`}>
          <div className="admin-message-header">
            <div>
              <span className="admin-message-name">{m.name}</span>
              <span className="admin-message-email">{m.email}</span>
            </div>
            <span className="admin-message-date">{m.date}</span>
          </div>
          <p className="admin-message-body">{m.message}</p>
          <div className="admin-message-actions">
            <button className="admin-btn-sm">Reply</button>
            {!m.read && <button className="admin-btn-sm">Mark Read</button>}
            <button className="admin-btn-sm danger">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function SettingsPanel() {
  return (
    <div className="admin-settings glass">
      <div className="admin-setting-group">
        <label>Site Name</label>
        <input type="text" defaultValue="Piton Studios" />
      </div>
      <div className="admin-setting-group">
        <label>Tagline</label>
        <input type="text" defaultValue="Independent brand, direction & motion studio" />
      </div>
      <div className="admin-setting-group">
        <label>Email</label>
        <input type="email" defaultValue="hi@pitonstudios.com" />
      </div>
      <div className="admin-setting-group">
        <label>WhatsApp Number</label>
        <input type="text" placeholder="+90 5XX XXX XX XX" />
      </div>
      <div className="admin-setting-group">
        <label>Location</label>
        <input type="text" defaultValue="Türkiye" />
      </div>
      <div className="admin-setting-group">
        <label>Instagram URL</label>
        <input type="url" defaultValue="https://instagram.com/pitonstudios" />
      </div>
      <button className="admin-btn primary" style={{ marginTop: 20 }}>Kaydet</button>
    </div>
  );
}
