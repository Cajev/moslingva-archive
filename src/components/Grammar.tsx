import './Grammar.css';

function Grammar() {
  return (
    <div className="grammar">
      <h2>📖 Grammaire Moslingva</h2>
      <section className="grammar-section">
        <h3>Pronoms</h3>
        <ul>
          <li>Je : O</li>
          <li>Tu : Tu</li>
          <li>Il/Elle : Il / Elle</li>
          <li>On : On</li>
          <li>Nous : Nous</li>
          <li>Vous : Vous</li>
          <li>Ils/Elles : Ils / Elles</li>
        </ul>
      </section>

      <section className="grammar-section">
        <h3>Conjugaisons</h3>
        <ul>
          <li>Infinitif : préfixe <strong>TO</strong></li>
          <li>Présent : sans suffixe</li>
          <li>Passé : suffixe <strong>RE</strong></li>
          <li>Futur : suffixe <strong>DA</strong></li>
        </ul>
        <p>Structure SVO (Sujet-Verbe-Objet)</p>
      </section>

      <section className="grammar-section">
        <h3>Système des nombres</h3>
        <p>Les nombres sont <strong>additifs</strong> :<br/>
           15 = 1+5, écrit 1 5, prononcé [10-5]<br/>
           27 = 2 10 7, prononcé [2-10-7].
        </p>
        <ul>
          <li>0 : NULA</li>
          <li>1 : UNA</li>
          <li>2 : DUA</li>
          <li>3 : TRIA</li>
          <li>4 : QUARTA</li>
          <li>5 : CINK</li>
          <li>6 : SESTA</li>
          <li>7 : SEPTA</li>
          <li>8 : OCTA</li>
          <li>9 : NONA</li>
          <li>10 : DECIM</li>
          <li>100 : CENTUM</li>
        </ul>
      </section>

      <section className="grammar-section">
        <h3>Exemples</h3>
        <ul>
          <li>[translate:Paradej] : Bonjour</li>
          <li>[translate:O aijdenai dei] : Je t'aime</li>
        </ul>
        <p>Pour chaque verbe :
          <br/>Infinitif (to) : <strong>TO</strong> + verbe
          <br/>Passé : verbe + <strong>RE</strong>
          <br/>Futur : verbe + <strong>DA</strong>
        </p>
        <p>Phrase type : Sujet Verbe Objet<br/>
          Ex : [translate:O paradej tus] (Je salue tous)
        </p>
      </section>
    </div>
  );
}
export default Grammar;
