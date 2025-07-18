import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import Select from 'react-select';

const CURRENCIES = [
  'USD', 'EUR', 'CNY', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'HKD', 'SGD', 'KRW', 'THB', 'RUB', 'INR', 'BRL', 'ZAR'
];

const CURRENCY_INFO: Record<string, {en: string, zh: string}> = {
  USD: {
    en: 'USD (United States Dollar): The United States Dollar (symbol: $) is the official currency of the United States and its territories. It is the most widely used reserve currency in the world.',
    zh: '美元（USD）：美元（符号：$）是美国及其海外领土的官方货币，也是全球最主要的储备货币。',
  },
  CNY: {
    en: 'CNY (Chinese Yuan): The Chinese Yuan (symbol: ¥, code: CNY) is the official currency of the People\'s Republic of China. It is also known as Renminbi (RMB).',
    zh: '人民币（CNY）：人民币（符号：¥，代码：CNY）是中华人民共和国的法定货币，亦称“元”或“RMB”。',
  },
  EUR: {
    en: 'EUR (Euro): The Euro (symbol: €, code: EUR) is the official currency of the Eurozone, used by 20 of the 27 European Union countries.',
    zh: '欧元（EUR）：欧元（符号：€，代码：EUR）是欧元区19个欧盟国家的官方货币。',
  },
  JPY: {
    en: 'JPY (Japanese Yen): The Japanese Yen (symbol: ¥, code: JPY) is the official currency of Japan. It is the third most traded currency in the world.',
    zh: '日元（JPY）：日元（符号：¥，代码：JPY）是日本的官方货币，是全球第三大交易货币。',
  },
  GBP: {
    en: 'GBP (Pound Sterling): The Pound Sterling (symbol: £, code: GBP) is the official currency of the United Kingdom and its territories.',
    zh: '英镑（GBP）：英镑（符号：£，代码：GBP）是英国及其海外领土的官方货币。',
  },
  AUD: {
    en: 'AUD (Australian Dollar): The Australian Dollar (symbol: $, code: AUD) is the official currency of Australia and several Pacific island states.',
    zh: '澳元（AUD）：澳大利亚元（符号：$，代码：AUD）是澳大利亚及部分太平洋岛国的官方货币。',
  },
  CAD: {
    en: 'CAD (Canadian Dollar): The Canadian Dollar (symbol: $, code: CAD) is the official currency of Canada.',
    zh: '加元（CAD）：加元（符号：$，代码：CAD）是加拿大的官方货币。',
  },
  CHF: {
    en: 'CHF (Swiss Franc): The Swiss Franc (symbol: Fr, code: CHF) is the official currency of Switzerland and Liechtenstein.',
    zh: '瑞士法郎（CHF）：瑞士法郎（符号：Fr，代码：CHF）是瑞士和列支敦士登的官方货币。',
  },
  HKD: {
    en: 'HKD (Hong Kong Dollar): The Hong Kong Dollar (symbol: HK$, code: HKD) is the official currency of Hong Kong.',
    zh: '港元（HKD）：港元（符号：HK$，代码：HKD）是中国香港特别行政区的官方货币。',
  },
  SGD: {
    en: 'SGD (Singapore Dollar): The Singapore Dollar (symbol: S$, code: SGD) is the official currency of Singapore.',
    zh: '新加坡元（SGD）：新加坡元（符号：S$，代码：SGD）是新加坡的官方货币。',
  },
  KRW: {
    en: 'KRW (South Korean Won): The South Korean Won (symbol: ₩, code: KRW) is the official currency of South Korea.',
    zh: '韩元（KRW）：韩元（符号：₩，代码：KRW）是韩国的官方货币。',
  },
  THB: {
    en: 'THB (Thai Baht): The Thai Baht (symbol: ฿, code: THB) is the official currency of Thailand.',
    zh: '泰铢（THB）：泰铢（符号：฿，代码：THB）是泰国的官方货币。',
  },
  RUB: {
    en: 'RUB (Russian Ruble): The Russian Ruble (symbol: ₽, code: RUB) is the official currency of Russia.',
    zh: '卢布（RUB）：俄罗斯卢布（符号：₽，代码：RUB）是俄罗斯的官方货币。',
  },
  INR: {
    en: 'INR (Indian Rupee): The Indian Rupee (symbol: ₹, code: INR) is the official currency of India.',
    zh: '印度卢比（INR）：印度卢比（符号：₹，代码：INR）是印度的官方货币。',
  },
  BRL: {
    en: 'BRL (Brazilian Real): The Brazilian Real (symbol: R$, code: BRL) is the official currency of Brazil.',
    zh: '巴西雷亚尔（BRL）：巴西雷亚尔（符号：R$，代码：BRL）是巴西的官方货币。',
  },
  ZAR: {
    en: 'ZAR (South African Rand): The South African Rand (symbol: R, code: ZAR) is the official currency of South Africa.',
    zh: '南非兰特（ZAR）：南非兰特（符号：R，代码：ZAR）是南非的官方货币。',
  },
};

// 本地币种中英文对照表
const CURRENCY_NAME_MAP: Record<string, {en: string, zh: string}> = {
  USD: { en: 'United States Dollar', zh: '美元' },
  CNY: { en: 'Chinese Renminbi Yuan', zh: '人民币' },
  EUR: { en: 'Euro', zh: '欧元' },
  JPY: { en: 'Japanese Yen', zh: '日元' },
  GBP: { en: 'Pound Sterling', zh: '英镑' },
  AUD: { en: 'Australian Dollar', zh: '澳元' },
  CAD: { en: 'Canadian Dollar', zh: '加元' },
  CHF: { en: 'Swiss Franc', zh: '瑞士法郎' },
  HKD: { en: 'Hong Kong Dollar', zh: '港元' },
  SGD: { en: 'Singapore Dollar', zh: '新加坡元' },
  KRW: { en: 'South Korean Won', zh: '韩元' },
  THB: { en: 'Thai Baht', zh: '泰铢' },
  RUB: { en: 'Russian Ruble', zh: '卢布' },
  INR: { en: 'Indian Rupee', zh: '印度卢比' },
  BRL: { en: 'Brazilian Real', zh: '巴西雷亚尔' },
  ZAR: { en: 'South African Rand', zh: '南非兰特' },
};

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'ru', label: 'Русский' },
  { code: 'pt', label: 'Português' },
  { code: 'it', label: 'Italiano' },
  { code: 'ar', label: 'العربية' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'pl', label: 'Polski' },
  { code: 'th', label: 'ไทย' },
  { code: 'vi', label: 'Tiếng Việt' },
];

function App() {
  const { t, i18n } = useTranslation();
  const [amount, setAmount] = useState('1');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('CNY');
  const [result, setResult] = useState<number | null>(null);
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currencies, setCurrencies] = useState<{ code: string; name: string }[]>([]);

  useEffect(() => {
    fetch('https://api.frankfurter.app/currencies')
      .then(res => res.json())
      .then(data => {
        const arr = Object.entries(data).map(([code, name]) => ({ code, name: name as string }));
        setCurrencies(arr);
      });
  }, []);

  const fetchRate = async (amt = amount, f = from, t_ = to) => {
    setLoading(true);
    setError('');
    setResult(null);
    setRate(null);
    if (f === t_) {
      setResult(Number(amt));
      setRate(1);
      setLoading(false);
      return;
    }
    try {
      const numAmount = Number(amt) || 0;
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${numAmount}&from=${f}&to=${t_}`);
      const data = await res.json();
      if (data && data.rates && data.rates[t_]) {
        setResult(data.rates[t_]);
        setRate(data.rates[t_] / numAmount);
      } else {
        setError(t('error'));
      }
    } catch (e) {
      setError(t('error'));
    }
    setLoading(false);
  };

  const handleSwitch = () => {
    setFrom(to);
    setTo(from);
    setResult(null);
    setRate(null);
  };

  const switchLang = () => {
    const newLang = i18n.language === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(newLang);
    document.documentElement.lang = newLang;
  };

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 600;

  // 币种选项格式，label根据语言切换
  const currencyOptions = currencies.map(cur => ({
    value: cur.code,
    label: `${cur.code} - ${CURRENCY_NAME_MAP[cur.code]?.[i18n.language as 'en' | 'zh'] || cur.name}`
  }));
  // 当前选中项
  const fromOption = currencyOptions.find(opt => opt.value === from);
  const toOption = currencyOptions.find(opt => opt.value === to);

  return (
    <div className="ai-currency-root">
      <header className="ai-currency-header">
        <img className="main-logo" src="/logo.svg" alt="logo" style={{height:'20px',marginRight:'10px'}} />
        <select
          className="lang-btn"
          value={i18n.language}
          onChange={e => {
            i18n.changeLanguage(e.target.value);
            document.documentElement.lang = e.target.value;
          }}
        >
          {LANGUAGES.map(lang => (
            <option key={lang.code} value={lang.code}>{lang.label}</option>
          ))}
        </select>
      </header>
      <main className="ai-currency-main">
        <h1 className="ai-title">{t('title')}</h1>
        <div className="ai-card">
          <div className="ai-input-group">
            <label>{t('amount')}</label>
            <input type="number" min={0} value={amount} onChange={e => setAmount(e.target.value)} className="ai-input" />
          </div>
          <div className="ai-input-row">
            <div className="ai-input-group">
              <label>{t('from')}</label>
              <Select
                classNamePrefix="currency-select"
                options={currencyOptions}
                value={fromOption}
                onChange={opt => setFrom(opt?.value || '')}
                getOptionLabel={opt => opt.label}
                getOptionValue={opt => opt.value}
                formatOptionLabel={(opt, { context }) => context === 'menu' ? `${opt.value} - ${currencies.find(c => c.code === opt.value)?.name || ''}` : opt.value}
                isSearchable={!isMobile}
                placeholder={t('from')}
                styles={{
                  control: (base) => ({ ...base, background: 'rgba(255,255,255,0.10)', color: '#fff', borderRadius: '0.9rem', borderColor: '#91eac9', minHeight: '44px', boxShadow: 'none' }),
                  singleValue: (base) => ({ ...base, color: '#fff', fontSize: '1.13em', fontWeight: 500 }),
                  menu: (base) => ({ ...base, background: '#23243a', color: '#fff', zIndex: 10 }),
                  option: (base, state) => ({ ...base, background: state.isFocused ? '#91eac944' : 'transparent', color: '#fff', fontWeight: state.isSelected ? 700 : 400 }),
                }}
              />
            </div>
            <button className="ai-switch-btn" onClick={handleSwitch} title={t('switch')}>
              ⇄
            </button>
            <div className="ai-input-group">
              <label>{t('to')}</label>
              <Select
                classNamePrefix="currency-select"
                options={currencyOptions}
                value={toOption}
                onChange={opt => setTo(opt?.value || '')}
                getOptionLabel={opt => opt.label}
                getOptionValue={opt => opt.value}
                formatOptionLabel={(opt, { context }) => context === 'menu' ? `${opt.value} - ${currencies.find(c => c.code === opt.value)?.name || ''}` : opt.value}
                isSearchable={!isMobile}
                placeholder={t('to')}
                styles={{
                  control: (base) => ({ ...base, background: 'rgba(255,255,255,0.10)', color: '#fff', borderRadius: '0.9rem', borderColor: '#91eac9', minHeight: '44px', boxShadow: 'none' }),
                  singleValue: (base) => ({ ...base, color: '#fff', fontSize: '1.13em', fontWeight: 500 }),
                  menu: (base) => ({ ...base, background: '#23243a', color: '#fff', zIndex: 10 }),
                  option: (base, state) => ({ ...base, background: state.isFocused ? '#91eac944' : 'transparent', color: '#fff', fontWeight: state.isSelected ? 700 : 400 }),
                }}
              />
            </div>
          </div>
          <button className="ai-convert-btn" onClick={() => fetchRate()} disabled={loading}>
            {loading ? t('loading') : t('convert')}
          </button>
          {error && <div className="ai-error">{error}</div>}
          {rate && (
            <div className="ai-rate">{t('rate')}:<br/>1 {from} = {Number(rate).toFixed(4)} {to}</div>
          )}
          {result !== null && !error && (
            <>
              <div className="ai-result">{t('result')}: <b style={{color:'#ff4d4f',fontWeight:'bold'}}>{Number(result).toFixed(2)}</b> {to}</div>
              <div className="currency-info-area">
                <p className="currency-info">
                  {CURRENCY_INFO[from]?.[i18n.language as keyof typeof CURRENCY_INFO[string]]
                    || currencies.find(c => c.code === from)?.name
                    || (i18n.language === 'zh' ? '暂无介绍' : 'No info available')}
                </p>
                <p className="currency-info">
                  {CURRENCY_INFO[to]?.[i18n.language as keyof typeof CURRENCY_INFO[string]]
                    || currencies.find(c => c.code === to)?.name
                    || (i18n.language === 'zh' ? '暂无介绍' : 'No info available')}
                </p>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;