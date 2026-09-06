import Background from './components/Background.jsx';
import Lantern from './components/Lantern.jsx';
import LanternForm from './components/LanternForm.jsx';
import Krathong from './components/Krathong.jsx';
import KrathongForm from './components/KrathongForm.jsx';
import { useState, useEffect, useCallback, useRef } from 'react';
import backgroundTrack from "/dist/images/เพลงลอยกระทง  รำวงลอยกระทง ดงเดม  วนเพญเดอนสบสอง  แสงจนทร กระทง และรอยยมของผคน.mp3"

const copy = {
  en: {
    eyebrow: 'A digital river of wishes',
    title: 'Loy Krathong',
    titleAccent: 'Online',
    intro: 'Release a little light into the night and make a wish.',
    lanterns: 'lanterns released',
    krathongs: 'krathongs created',
    release: 'Release a lantern',
    create: 'Create a krathong',
    soundOn: 'Turn sound off',
    soundOff: 'Turn sound on',
    language: 'Language',
    lanternFormTitle: 'Send a wish into the night',
    lanternFormIntro: 'Your light will join the river above.',
    krathongFormTitle: 'Float a krathong',
    krathongFormIntro: 'Carry your wish gently across the river.',
    namePlaceholder: 'Name',
    wishPlaceholder: 'State your wish!',
    lanternSubmit: 'Release lantern',
    krathongSubmit: 'Float krathong',
    cancel: 'Cancel',
    detailKicker: 'A wish carried by light',
    close: 'Close'
  },
  th: {
    eyebrow: 'สายน้ำแห่งคำอธิษฐาน',
    title: 'ลอยกระทง',
    titleAccent: 'ออนไลน์',
    intro: 'ปล่อยแสงเล็ก ๆ สู่ค่ำคืนพร้อมคำอธิษฐาน',
    lanterns: 'โคมลอยที่ปล่อย',
    krathongs: 'กระทงที่สร้าง',
    release: 'ปล่อยโคมลอย',
    create: 'สร้างกระทง',
    soundOn: 'ปิดเสียง',
    soundOff: 'เปิดเสียง',
    language: 'ภาษา',
    lanternFormTitle: 'ส่งคำอธิษฐานสู่ราตรี',
    lanternFormIntro: 'แสงของคุณจะร่วมลอยขึ้นไปบนสายน้ำ',
    krathongFormTitle: 'ลอยกระทง',
    krathongFormIntro: 'ส่งคำอธิษฐานของคุณลอยไปตามสายน้ำ',
    namePlaceholder: 'ชื่อ',
    wishPlaceholder: 'เขียนคำอธิษฐาน',
    lanternSubmit: 'ปล่อยโคมลอย',
    krathongSubmit: 'ลอยกระทง',
    cancel: 'ยกเลิก',
    detailKicker: 'คำอธิษฐานที่ลอยไปกับแสง',
    close: 'ปิด'
  },
  zh: {
    eyebrow: '承载愿望的数字河流',
    title: '水灯节',
    titleAccent: '线上',
    intro: '让一盏小小的灯带着愿望漂入夜色。',
    lanterns: '已放飞天灯',
    krathongs: '已创建水灯',
    release: '放飞天灯',
    create: '创建水灯',
    soundOn: '关闭声音',
    soundOff: '打开声音',
    language: '语言',
    lanternFormTitle: '把愿望送入夜色',
    lanternFormIntro: '让你的灯光加入夜空。',
    krathongFormTitle: '放一盏水灯',
    krathongFormIntro: '让你的愿望沿着河流漂流。',
    namePlaceholder: '姓名',
    wishPlaceholder: '写下你的愿望',
    lanternSubmit: '放飞天灯',
    krathongSubmit: '放水灯',
    cancel: '取消',
    detailKicker: '随灯光漂流的愿望',
    close: '关闭'
  }
};

const languageOptions = [
  { code: 'en', label: 'English', icon: 'EN' },
  { code: 'th', label: 'ไทย', icon: 'TH' },
  { code: 'zh', label: '中文', icon: 'CN' }
];

function App() {
  const [lanterns, setLanterns] = useState([]);
  const [lanternCount, setLanternCount] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', wish: '', form: 'lantern' });
  const [selectedLantern, setSelectedLantern] = useState(null);
  const [krathongs, setKrathongs] = useState([]);
  const [krathongCount, setKrathongCount] = useState(0);
  const [showKrathongForm, setShowKrathongForm] = useState(false);
  const [krathongFormData, setKrathongFormData] = useState({ name: '', wish: '', form: 'krathong' });
  const [soundEnabled, setSoundEnabled] = useState(() => localStorage.getItem('soundEnabled') !== 'false');
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en');
  const [showLanguages, setShowLanguages] = useState(false);
  const languageRef = useRef(null);
  const labels = copy[language];
  const selectedLanguage = languageOptions.find(option => option.code === language) || languageOptions[0];
  const bgAudioRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('soundEnabled', String(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    const closeMenu = (event) => {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setShowLanguages(false);
      }
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, []);

  const toggleSound = () => {
    const nextValue = !soundEnabled;
    setSoundEnabled(nextValue);
    if (nextValue && 'AudioContext' in window) {
      if (!bgAudioRef.current) {
        // Initialize the audio instance only once
        bgAudioRef.current = new Audio(backgroundTrack);
        bgAudioRef.current.loop = true;
      }
    bgAudioRef.current.play().catch(err => console.log("Playback blocked:", err));
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.frequency.value = 660;
      gain.gain.setValueAtTime(0.05, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.16);
      oscillator.connect(gain).connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.16);
    } else {
      if (bgAudioRef.current) {
        bgAudioRef.current.pause();
        bgAudioRef.current = null;
      }
    }
  };

  const handleFadeComplete = useCallback((id) => {
    setLanterns(previousLanterns => previousLanterns.map(item => (
      item.id === id ? {
        ...item,
        phase: 'looping',
        topOff: Math.round(window.innerHeight * 0.42),
        hidden: false
      } : item
    )));
  }, []);

  const handleKrathongComplete = useCallback((id) => {
    setKrathongs(previousKrathongs => previousKrathongs.map(item => (
      item.id === id ? { ...item, phase: 'looping', xPosition: -12 } : item
    )));
  }, []);

  // Load from localStorage on initial render
  useEffect(() => {
    const savedCount = parseInt(localStorage.getItem('lanternCount')) || 0;
    const savedLanterns = JSON.parse(localStorage.getItem('lanterns')) || [];
    const loopingLanterns = savedLanterns.map(lantern => ({
      ...lantern,
      form: lantern.form || 'lantern',
      phase: 'looping',
      topOff: Math.round(window.innerHeight * 0.42),
      hidden: false,
      xPosition: lantern.xPosition ?? Math.floor(Math.random() * 70) + 15
    }));
    const savedKrathongs = JSON.parse(localStorage.getItem('krathongs')) || [];
    const loopingKrathongs = savedKrathongs.map(krathong => ({
      ...krathong,
      form: krathong.form || 'krathong',
      phase: 'looping'
    }));

    setLanternCount(savedCount);
    setLanterns(loopingLanterns);
    setKrathongCount(parseInt(localStorage.getItem('krathongCount')) || loopingKrathongs.length);
    setKrathongs(loopingKrathongs);
  }, []);

  // Save to localStorage whenever lanterns or count change
  useEffect(() => {
    localStorage.setItem('lanternCount', lanternCount);
    localStorage.setItem('lanterns', JSON.stringify(lanterns));
  }, [lanternCount, lanterns]);

  useEffect(() => {
    localStorage.setItem('krathongCount', krathongCount);
    localStorage.setItem('krathongs', JSON.stringify(krathongs));
  }, [krathongCount, krathongs]);

  const handleReleaseLantern = (name, wish) => {
    const newId = lanternCount + 1;
    const newLantern = {
      id: newId,
      name: name,
      wish: wish,
      form: 'lantern',
      topOff: Math.round(window.innerHeight * 0.54),
      xPosition: 50,
      phase: 'large',
      hidden: false
    };

    setLanterns(previousLanterns => [...previousLanterns, newLantern]);
    setLanternCount(newId);
    setShowForm(false);
    setFormData({ name: '', wish: '', form: 'lantern' });
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleToggleKrathongForm = () => {
    setShowKrathongForm(!showKrathongForm);
  };

  const handleCreateKrathong = (name, wish) => {
    const newId = krathongCount + 1;
    setKrathongs(previousKrathongs => [...previousKrathongs, {
      id: newId,
      name,
      wish,
      form: 'krathong',
      phase: 'new'
    }]);
    setKrathongCount(newId);
    setShowKrathongForm(false);
    setKrathongFormData({ name: '', wish: '', form: 'krathong' });
  };

  const festivalItems = [
    ...lanterns.filter(lantern => !lantern.hidden),
    ...krathongs
  ];
  const lanternItems = festivalItems.filter(item => item.form === 'lantern');
  const krathongItems = festivalItems.filter(item => item.form === 'krathong');

  const renderFestivalItem = (item) => {
    if (item.form === 'krathong') {
      return (
        <Krathong
          key={`krathong-${item.id}`}
          krathong={item}
          onComplete={handleKrathongComplete}
        />
      );
    }

    return (
      <Lantern
        key={`lantern-${item.id}`}
        lantern={item}
        onFadeComplete={handleFadeComplete}
        onLanternClick={setSelectedLantern}
      />
    );
  };

  return (
    <>
      <Background />
      <main className="app-container">
        <div className="utility-controls">
          <button
            className="utility-button"
            type="button"
            aria-label={soundEnabled ? labels.soundOn : labels.soundOff}
            title={soundEnabled ? labels.soundOn : labels.soundOff}
            aria-pressed={soundEnabled}
            onClick={toggleSound}
          >
            <span aria-hidden="true">{soundEnabled ? '◖))' : '◖×)'}</span>
          </button>
          <div className="language-control" ref={languageRef}>
            <button
              className="utility-button"
              type="button"
              aria-label={labels.language}
              title={labels.language}
              aria-expanded={showLanguages}
              onClick={() => setShowLanguages(previous => !previous)}
            >
              <span aria-hidden="true">{selectedLanguage.icon}</span>
            </button>
            {showLanguages && (
              <div className="language-menu" role="menu" aria-label={labels.language}>
                {languageOptions.map(option => (
                  <button
                    key={option.code}
                    type="button"
                    role="menuitem"
                    className={language === option.code ? 'selected' : ''}
                    onClick={() => { setLanguage(option.code); setShowLanguages(false); }}
                  >
                    <span className="language-icon" aria-hidden="true">{option.icon}</span>
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="bridge bridge-foreground" aria-hidden="true">
          <img src="/dist/images/bridge.png" alt="" />
        </div>
        <header className="app-header">
          <div className="eyebrow">{labels.eyebrow}</div>
          <h1>{labels.title} <span>{labels.titleAccent}</span></h1>
          <p className="intro">{labels.intro}</p>
          <div className="stats" aria-label="Festival activity">
            <div className="stat">
              <strong>{lanternCount}</strong>
              <span>{labels.lanterns}</span>
            </div>
            <div className="stat-divider" aria-hidden="true" />
            <div className="stat">
              <strong>{krathongCount}</strong>
              <span>{labels.krathongs}</span>
            </div>
          </div>
        </header>

        <div className="large-lantern-layer">
          {festivalItems
            .filter(item => item.form === 'lantern' && item.phase === 'large')
            .map(renderFestivalItem)}
        </div>

        <div className="lanterns-container">
          {lanternItems
            .filter(item => item.phase !== 'large')
            .map(renderFestivalItem)}
        </div>

        <div className="krathong-layer">
          {krathongItems.map(renderFestivalItem)}
        </div>

        <div className="ui-controls">
          <div className="start-buttons">
            <button
              onClick={handleToggleForm}
              className="lantern-button"
            >
              <span className="button-icon" aria-hidden="true">↑</span>
              <span>{labels.release}</span>
            </button>
            <button
              className="krathong-button"
              onClick={handleToggleKrathongForm}
            >
              <span className="button-icon" aria-hidden="true">✦</span>
              <span>{labels.create}</span>
            </button>
          </div>
        </div>

        {showForm && (
          <div className="lantern-form-overlay" onClick={handleToggleForm}>
            <div className="lantern-form" onClick={e => e.stopPropagation()}>
              <LanternForm
                showForm={showForm}
                onToggleForm={handleToggleForm}
                formData={formData}
                onFormChange={setFormData}
                onSubmit={handleReleaseLantern}
                labels={labels}
              />
            </div>
          </div>
        )}

        {showKrathongForm && (
          <div className="lantern-form-overlay" onClick={handleToggleKrathongForm}>
            <div className="lantern-form" onClick={event => event.stopPropagation()}>
              <KrathongForm
                formData={krathongFormData}
                onFormChange={setKrathongFormData}
                onSubmit={handleCreateKrathong}
                onToggleForm={handleToggleKrathongForm}
                labels={labels}
              />
            </div>
          </div>
        )}

        {selectedLantern && (
          <div className="lantern-detail-overlay" onClick={() => setSelectedLantern(null)}>
            <section
              className="lantern-detail-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="lantern-detail-title"
              onClick={event => event.stopPropagation()}
            >
              <div className="detail-kicker">{labels.detailKicker}</div>
              <h2 id="lantern-detail-title">{selectedLantern.name}</h2>
              <p>{selectedLantern.wish}</p>
              <button type="button" onClick={() => setSelectedLantern(null)}>{labels.close}</button>
            </section>
          </div>
        )}
      </main>
    </>
  );
}

export default App;