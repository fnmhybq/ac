import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DatePicker, { registerLocale } from 'react-datepicker';
import { zhCN } from 'date-fns/locale/zh-CN';
import { enUS } from 'date-fns/locale/en-US';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

registerLocale('zh', zhCN);
registerLocale('en', enUS);

function formatDate(date: Date | null) {
  if (!date) return '';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getWeekday(date: Date | null, lang: string) {
  if (!date) return '';
  const weekMap = {
    zh: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
    en: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  };
  const idx = date.getDay();
  return lang === 'zh' ? weekMap.zh[idx] : weekMap.en[idx];
}

function App() {
  const { t, i18n } = useTranslation();
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  const [days, setDays] = useState<number | null>(null);

  const calcDays = () => {
    if (start && end) {
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDays(diffDays);
    } else {
      setDays(null);
    }
  };

  const switchLang = () => {
    const newLang = i18n.language === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(newLang);
    document.documentElement.lang = newLang;
  };

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="date-calc-root">
      <header className="date-calc-header" style={{justifyContent:'space-between',alignItems:'center',flexDirection:'row',gap:'0'}}>
        <img className="main-logo" src="/logo.svg" alt="logo" style={{height:'16.9px',marginBottom:'0',marginLeft:'0'}} />
        <button className="lang-btn" style={{fontSize:'0.8rem',minWidth:'80px',padding:'0.4em 0.8em'}} onClick={switchLang}>
          {t('langSwitch')}
        </button>
      </header>
      <div style={{width:'100%',display:'flex',justifyContent:'center',margin:'0.8rem 0 0.5rem 0'}}>
        <h2 style={{fontSize:'2rem',fontWeight:700,letterSpacing:'2px',color:'#fff',margin:0}}>{t('title')}</h2>
      </div>
      <main className="date-calc-main" style={{justifyContent:'flex-end',minHeight:'60vh'}}>
        <div className="date-calc-card">
          <div className="input-group">
            <label htmlFor="start-date">{t('startDate')}</label>
            <DatePicker
              id="start-date"
              selected={start}
              onChange={date => setStart(date)}
              dateFormat={i18n.language === 'zh' ? 'yyyy/MM/dd' : 'yyyy/MM/dd'}
              locale={i18n.language}
              placeholderText={t('placeholderStart')}
              className="custom-datepicker"
              showPopperArrow={false}
              popperPlacement="bottom"
              isClearable
            />
            <div style={{fontSize:'0.95em',color:'#aaa',marginTop:'2px',minHeight:'1.5em'}}>
              {start && `${formatDate(start)} ${getWeekday(start, i18n.language)}`}
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="end-date">{t('endDate')}</label>
            <DatePicker
              id="end-date"
              selected={end}
              onChange={date => setEnd(date)}
              dateFormat={i18n.language === 'zh' ? 'yyyy/MM/dd' : 'yyyy/MM/dd'}
              locale={i18n.language}
              placeholderText={t('placeholderEnd')}
              className="custom-datepicker"
              showPopperArrow={false}
              popperPlacement="bottom"
              isClearable
            />
            <div style={{fontSize:'0.95em',color:'#aaa',marginTop:'2px',minHeight:'1.5em'}}>
              {end && `${formatDate(end)} ${getWeekday(end, i18n.language)}`}
            </div>
          </div>
          <button className="calc-btn" onClick={calcDays}>
            {t('calculate')}
          </button>
        </div>
      </main>
      {days !== null && (
        <div className="result-fixed">
          <span>{t('days')}</span>
          <div>
            <b style={{color: days < 0 ? '#ff4d4f' : '#fff'}}>{days}</b> {t('result')}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;