import { useState } from "react";

// Colorful "About Village" popup — village profile + Bhagwan Parshuram section.
// To show a real photo, drop an image at  public/parshuram.jpg .
// If the file is absent, a decorative parashu (axe) emblem is shown instead.
function ParashuEmblem() {
  return (
    <svg viewBox="0 0 120 120" width="96" height="96" role="img" aria-label="Parashu emblem">
      <defs>
        <radialGradient id="halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff7e6" />
          <stop offset="100%" stopColor="#ffb300" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="56" fill="url(#halo)" stroke="#fff" strokeWidth="3" />
      {/* rays */}
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={i} x="59" y="2" width="2" height="10" fill="#ff8f00"
          transform={`rotate(${i * 30} 60 60)`} />
      ))}
      {/* axe handle */}
      <rect x="57" y="40" width="6" height="52" rx="3" fill="#6d4c2f" transform="rotate(18 60 66)" />
      {/* axe head */}
      <path d="M62 40 q26 2 24 22 q-18 -6 -24 -6 Z" fill="#7a4a2b" />
      <path d="M58 40 q-26 2 -24 22 q18 -6 24 -6 Z" fill="#8a5a36" />
      <text x="60" y="108" textAnchor="middle" fontSize="13" fontWeight="700" fill="#b00020">ॐ</text>
    </svg>
  );
}

export default function AboutVillageModal({ open, onClose }) {
  const [imgError, setImgError] = useState(false);
  if (!open) return null;

  return (
    <div className="village-modal-bg" onClick={onClose}>
      <div className="village-modal" onClick={(e) => e.stopPropagation()}>
        <button className="vm-close" onClick={onClose} aria-label="Close">×</button>

        {/* Hero band */}
        <div className="vm-hero">
          <div className="vm-emblem">
            {imgError ? (
              <ParashuEmblem />
            ) : (
              <img src="parshuram.jpg" alt="भगवान परशुराम"
                onError={() => setImgError(true)} />
            )}
          </div>
          <div className="vm-hero-text">
            <span className="vm-kicker">🚩 जय परशुराम 🚩</span>
            <h2>नरसिंहपुर गढ़ी</h2>
            <p>गाँव परिचय · रेवाड़ी, हरियाणा</p>
          </div>
        </div>

        <div className="vm-body">
          <p className="vm-intro">
            <strong>नरसिंहपुर गढ़ी</strong> हरियाणा राज्य के <strong>रेवाड़ी जिले</strong> की
            <strong> बावल तहसील</strong> में स्थित एक सुंदर, शांत एवं समृद्ध ग्रामीण गाँव है।
          </p>

          {/* Colorful fact chips */}
          <div className="vm-facts">
            <div className="vm-fact f-blue"><span>📍 स्थान</span><b>बावल, रेवाड़ी – 123501</b></div>
            <div className="vm-fact f-green"><span>👨‍👩‍👧‍👦 जनसंख्या</span><b>≈ 936 निवासी</b></div>
            <div className="vm-fact f-amber"><span>🏠 परिवार</span><b>≈ 170 परिवार</b></div>
            <div className="vm-fact f-purple"><span>📚 साक्षरता</span><b>≈ 82.5%</b></div>
            <div className="vm-fact f-teal"><span>🌾 व्यवसाय</span><b>कृषि प्रधान</b></div>
            <div className="vm-fact f-rose"><span>🏛 प्रशासन</span><b>ग्राम पंचायत</b></div>
          </div>

          {/* Parshuram section */}
          <div className="vm-parshuram">
            <h3>🪓 भगवान परशुराम और हमारा गाँव</h3>
            <p>
              भगवान परशुराम, भगवान विष्णु के <strong>छठे अवतार</strong> माने जाते हैं, जो अपने हाथ में
              <strong> परशु (कुल्हाड़ी)</strong> धारण करते हैं और न्याय, शौर्य एवं धर्म के प्रतीक हैं।
              नरसिंहपुर गढ़ी के ग्रामवासियों की भगवान परशुराम में <strong>गहरी आस्था एवं श्रद्धा</strong> है।
              गाँव में <strong>परशुराम जयंती</strong> बड़े उत्साह एवं भक्ति-भाव से मनाई जाती है, और यह पर्व
              गाँव की एकता, संस्कृति एवं धार्मिक आस्था का प्रतीक बन गया है।
            </p>
          </div>

          <h3 className="vm-h3">भौगोलिक स्थिति</h3>
          <p className="vm-p">
            नरसिंहपुर गढ़ी, बावल औद्योगिक क्षेत्र के निकट दक्षिणी हरियाणा के समतल एवं अर्ध-शुष्क क्षेत्र
            में स्थित है। यहाँ का वातावरण शांत एवं ग्रामीण है, जहाँ अधिकांश लोग कृषि पर निर्भर हैं।
          </p>

          <h3 className="vm-h3">गाँव की विशेषताएँ</h3>
          <ul className="vm-list">
            <li>✅ शांत एवं स्वच्छ ग्रामीण वातावरण</li>
            <li>✅ शिक्षित एवं जागरूक नागरिक</li>
            <li>✅ सरकारी योजनाओं में सक्रिय भागीदारी</li>
            <li>✅ बावल एवं रेवाड़ी से अच्छी सड़क संपर्क सुविधा</li>
          </ul>

          <div className="vm-csc">
            <p>
              📍 <strong>स्थान कोड (Google Maps):</strong> 3GR4+G2F<br />
              📞 <strong>CSC Center Narsinghpur Garhi — आपकी सेवा में सदैव तत्पर</strong>
            </p>
            <a href="#contact" className="vm-btn" onClick={onClose}>अभी संपर्क करें</a>
          </div>
        </div>
      </div>
    </div>
  );
}
