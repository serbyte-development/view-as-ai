import { Document } from "../components/Document";
import { TestCase } from "../components/TestCase";
import type { FixtureRoute, StaticAsset } from "../fixture-types";
import { sentinel } from "../sentinel";

function ids(prefix: string, start: number, end: number): string[] {
  return Array.from(
    { length: end - start + 1 },
    (_, index) => `${prefix}-${String(start + index).padStart(3, "0")}`,
  );
}

const kitchenSinkIds = [
  ...ids("TEXT", 1, 33),
  ...ids("VIS", 1, 29),
  ...ids("SEM", 1, 36),
  ...ids("CTRL", 1, 35),
  ...ids("LINK", 1, 30),
  ...ids("IMG", 1, 21),
  ...ids("FRAME", 1, 5),
  ...ids("TABLE", 1, 14),
  ...ids("I18N", 1, 13),
];

const noPrimarySentinel = new Set([
  "TEXT-005",
  "TEXT-031",
  "TEXT-032",
  "LINK-015",
  "IMG-004",
  "IMG-005",
  "IMG-012",
  "FRAME-002",
]);

const kitchenSinkSentinels = Object.fromEntries(
  kitchenSinkIds
    .filter((testId) => !noPrimarySentinel.has(testId))
    .map((testId) => [testId, sentinel(testId)]),
);

const s = (testId: string) => sentinel(testId);

function RawHtml({ html }: { html: string }) {
  return (
    // biome-ignore lint/security/noDangerouslySetInnerHtml: exact source markup is the calibration subject.
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );
}

const embeddedVisibilityCss = `
.vis-004 { display: none; }
.vis-013 {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.vis-024 { display: block; }
@media (max-width: 600px) { .vis-024 { display: none; } }
.vis-025 { display: block; }
@media (min-width: 601px) { .vis-025 { display: none; } }
.vis-026 { display: none; }
@media print { .vis-026 { display: block; } }
.vis-027::before { content: "${s("VIS-027")}"; }
.vis-028::after { content: "${s("VIS-028")}"; }
`;

function TextFixtures() {
  return (
    <TestCase>
      <p>{s("TEXT-001")}</p>
      <span>{s("TEXT-002")}A</span>
      <span>B</span>
      <div>{s("TEXT-003")} Block one</div>
      <div>Block two</div>
      <p>
        {s("TEXT-004")} before
        <br />
        after
      </p>
      <hr />
      <div>
        <h1>{s("TEXT-006")} heading one</h1>
        <h2>heading two</h2>
        <h3>heading three</h3>
        <h4>heading four</h4>
        <h5>heading five</h5>
        <h6>heading six</h6>
      </div>
      <div>
        <h1>{s("TEXT-007")} first h1</h1>
        <h1>second h1</h1>
      </div>
      <section>
        <h2>{s("TEXT-008")} section heading</h2>
        <p>Section body</p>
      </section>
      <section>Section without heading</section>
      <article>{s("TEXT-009")} article body</article>
      <address>{s("TEXT-010")} 123 Calibration Way</address>
      <blockquote>
        {s("TEXT-011")} quoted fixture
        <cite>Fixture citation</cite>
      </blockquote>
      <ul>
        <li>{s("TEXT-012")} unordered one</li>
        <li>unordered two</li>
      </ul>
      <ol>
        <li>{s("TEXT-013")} ordered one</li>
        <li>ordered two</li>
      </ol>
      <ul>
        <li>
          {s("TEXT-014")} parent
          <ol>
            <li>nested child</li>
          </ol>
        </li>
      </ul>
      <dl>
        <dt>{s("TEXT-015")} term</dt>
        <dd>definition</dd>
      </dl>
      <pre>{`${s("TEXT-016")}  pre  spacing\n  indented`}</pre>
      <p>
        <code>{s("TEXT-017")}_inline_code</code>
      </p>
      <pre>
        <code>{`${s("TEXT-018")}  code\n  indentation`}</code>
      </pre>
      <p>
        <strong>{s("TEXT-019")}strong</strong>
        <b>bold</b>
        <em>emphasis</em>
        <i>italic</i>
      </p>
      <p>
        {s("TEXT-020")}H<sub>2</sub>O x<sup>2</sup>
      </p>
      <p>
        <mark>{s("TEXT-021")}mark</mark>
        <small>small</small>
        <del>deleted</del>
        <ins>inserted</ins>
        <s>struck</s>
      </p>
      <RawHtml html={`<p>${s("TEXT-022")}one<!-- split -->word</p>`} />
      <RawHtml html={`<!-- ${s("TEXT-023")} -->`} />
      <template>{s("TEXT-024")} template content</template>
      <noscript>{s("TEXT-025")} noscript content</noscript>
      <details>
        <summary>Closed summary</summary>
        <p>{s("TEXT-026")} closed details content</p>
      </details>
      <details open>
        <summary>Open summary</summary>
        <p>{s("TEXT-027")} open details content</p>
      </details>
      <details>
        <summary>{s("TEXT-028")} summary content</summary>
      </details>
      <dialog>{s("TEXT-029")} closed dialog content</dialog>
      <dialog open>{s("TEXT-030")} open dialog content</dialog>
      <p>
        Before
        <span />
        After
      </p>
      <div> </div>
      <p>{`${s("TEXT-033")}    repeated\tspaces\nnew line`}</p>
    </TestCase>
  );
}

function VisibilityFixtures() {
  return (
    <TestCase>
      <div>{s("VIS-001")}</div>
      <div hidden>{s("VIS-002")}</div>
      <div style={{ display: "none" }}>{s("VIS-003")}</div>
      <div className="vis-004">{s("VIS-004")}</div>
      <div className="vis-005">{s("VIS-005")}</div>
      <div style={{ visibility: "hidden" }}>{s("VIS-006")}</div>
      <div style={{ visibility: "collapse" }}>{s("VIS-007")}</div>
      <div style={{ opacity: 0 }}>{s("VIS-008")}</div>
      <div style={{ color: "transparent" }}>{s("VIS-009")}</div>
      <div style={{ fontSize: 0 }}>{s("VIS-010")}</div>
      <div style={{ width: 0, height: 0, overflow: "hidden" }}>{s("VIS-011")}</div>
      <div style={{ clipPath: "inset(100%)" }}>{s("VIS-012")}</div>
      <div className="vis-013">{s("VIS-013")}</div>
      <div style={{ position: "absolute", left: "-10000px" }}>{s("VIS-014")}</div>
      <div style={{ transform: "translateX(-200vw)" }}>{s("VIS-015")}</div>
      <div style={{ transform: "scale(0)" }}>{s("VIS-016")}</div>
      <div style={{ position: "relative", background: "white" }}>
        <span style={{ position: "absolute", zIndex: -1 }}>{s("VIS-017")}</span>
        <span>opaque foreground</span>
      </div>
      <div style={{ contentVisibility: "hidden" }}>{s("VIS-018")}</div>
      <div style={{ display: "none" }}>
        <span style={{ display: "block" }}>{s("VIS-019")}</span>
      </div>
      <div hidden>
        <a href="/visibility/hidden-link/">{s("VIS-020")}</a>
        <input placeholder="hidden nested control" />
      </div>
      <div style={{ display: "contents" }}>{s("VIS-021")}</div>
      <div style={{ maxHeight: "1px", overflow: "hidden" }}>
        <p>{s("VIS-022")}</p>
      </div>
      <div style={{ position: "relative" }}>
        <span>{s("VIS-023")}</span>
        <span
          style={{
            position: "absolute",
            inset: 0,
            background: "white",
            zIndex: 2,
          }}
        >
          opaque cover
        </span>
      </div>
      <div className="vis-024">{s("VIS-024")}</div>
      <div className="vis-025">{s("VIS-025")}</div>
      <div className="vis-026">{s("VIS-026")}</div>
      <div className="vis-027" />
      <div className="vis-028" />
      <div className="hidden-md">{s("VIS-029")}</div>
    </TestCase>
  );
}

function SemanticFixtures() {
  return (
    <TestCase>
      <div>{s("SEM-001")}</div>
      <header>{s("SEM-002")}</header>
      <nav>{s("SEM-003")}</nav>
      <div role="navigation">{s("SEM-004")}</div>
      <nav role="navigation">{s("SEM-005")}</nav>
      <main>{s("SEM-006")}</main>
      <article>{s("SEM-007")}</article>
      <aside>{s("SEM-008")}</aside>
      <aside role="complementary">{s("SEM-009")}</aside>
      <footer>{s("SEM-010")}</footer>
      <footer role="contentinfo">{s("SEM-011")}</footer>
      <div role="banner">{s("SEM-012")}</div>
      <header role="banner">{s("SEM-013")}</header>
      <div role="search">{s("SEM-014")}</div>
      <div role="menu">{s("SEM-015")}</div>
      <div role="menubar">{s("SEM-016")}</div>
      <div role="dialog">{s("SEM-017")}</div>
      <div role="alert">{s("SEM-018")}</div>
      <div role="status">{s("SEM-019")}</div>
      <div aria-hidden="true">{s("SEM-020")}</div>
      <div aria-hidden="false">{s("SEM-021")}</div>
      <div aria-hidden="true">
        <span aria-hidden="false">{s("SEM-022")}</span>
      </div>
      <button type="button" aria-label={s("SEM-023")} />
      <button type="button" aria-label="Conflicting accessible label">
        {s("SEM-024")}
      </button>
      <span id="sem-025-label" hidden>
        {s("SEM-025")}
      </span>
      <button type="button" aria-labelledby="sem-025-label" />
      <span id="sem-026-description" hidden>
        {s("SEM-026")}
      </span>
      <button type="button" aria-describedby="sem-026-description">
        described control
      </button>
      <button type="button" aria-expanded="false" aria-controls="sem-027-region">
        collapsed control
      </button>
      <div id="sem-027-region">{s("SEM-027")}</div>
      <button type="button" aria-expanded="true" aria-controls="sem-028-region">
        expanded control
      </button>
      <div id="sem-028-region">{s("SEM-028")}</div>
      <button type="button" aria-controls="sem-029-target">
        {s("SEM-029")}
      </button>
      <div id="sem-029-target">controlled region</div>
      <a href="/current/" aria-current="page">
        {s("SEM-030")}
      </a>
      <div inert>{s("SEM-031")}</div>
      <div contentEditable suppressContentEditableWarning>
        {s("SEM-032")}
      </div>
      <div tabIndex={-1}>{s("SEM-033")}</div>
      <nav aria-label="Breadcrumb">
        <a href="/">{s("SEM-034")}</a>
      </nav>
      <nav className="breadcrumb">
        <a href="/">{s("SEM-035")}</a>
      </nav>
      <nav>
        <a href="/">{s("SEM-036")} breadcrumb wording only</a>
      </nav>
    </TestCase>
  );
}

function ControlFixtures() {
  return (
    <TestCase>
      <input value={s("CTRL-001")} readOnly />
      <input placeholder={s("CTRL-002")} />
      <input value={s("CTRL-003")} readOnly />
      <input placeholder={s("CTRL-004")} value="visible-value" readOnly />
      <input type="password" placeholder={s("CTRL-005")} />
      <input type="email" placeholder={s("CTRL-006")} />
      <input type="search" placeholder={s("CTRL-007")} />
      <input type="number" placeholder={s("CTRL-008")} />
      <input type="date" aria-label={s("CTRL-009")} />
      <input type="file" aria-label={s("CTRL-010")} />
      <input type="hidden" value={s("CTRL-011")} />
      <input type="checkbox" value={s("CTRL-012")} readOnly />
      <input type="checkbox" value={s("CTRL-013")} checked readOnly />
      <input type="radio" value={s("CTRL-014")} readOnly />
      <input type="radio" value={s("CTRL-015")} checked readOnly />
      <input disabled placeholder={s("CTRL-016")} />
      <input readOnly placeholder={s("CTRL-017")} />
      <label htmlFor="ctrl-018">{s("CTRL-018")}</label>
      <input id="ctrl-018" />
      <label>
        {s("CTRL-019")}
        <input />
      </label>
      <button type="button">{s("CTRL-020")}</button>
      <button type="button" aria-label={s("CTRL-021")} />
      <button type="button">
        <span>{s("CTRL-022")}</span>
      </button>
      <button type="button">
        <img src="/assets/baseline.svg" alt={s("CTRL-023")} />
      </button>
      <input type="submit" value={s("CTRL-024")} />
      <select defaultValue="one">
        <option value="one">{s("CTRL-025")}</option>
      </select>
      <select defaultValue="selected">
        <option value="other">other option</option>
        <option value="selected">{s("CTRL-026")}</option>
      </select>
      <select multiple defaultValue={["one"]}>
        <option value="one">{s("CTRL-027")}</option>
        <option value="two">second option</option>
      </select>
      <textarea defaultValue={s("CTRL-028")} />
      <fieldset>
        <legend>{s("CTRL-029")}</legend>
        <input />
      </fieldset>
      <input list="ctrl-030-list" />
      <datalist id="ctrl-030-list">
        <option value={s("CTRL-030")} />
      </datalist>
      <output>{s("CTRL-031")}</output>
      <progress value={1} max={2}>
        {s("CTRL-032")}
      </progress>
      <meter value={0.5}>{s("CTRL-033")}</meter>
      <div hidden>
        <form>
          <input placeholder={s("CTRL-034")} />
        </form>
      </div>
      <form role="search">
        <input placeholder={s("CTRL-035")} />
      </form>
    </TestCase>
  );
}

function LinkFixtures() {
  return (
    <TestCase>
      <a href="/relative-target/">{s("LINK-001")}</a>
      <a href="https://view-as-ai.vercel.app/absolute-target/">{s("LINK-002")}</a>
      <a href="https://example.com/external">{s("LINK-003")}</a>
      <a href="//example.com/protocol-relative">{s("LINK-004")}</a>
      <a href="#link-fragment-target">{s("LINK-005")}</a>
      <a href="?link-query=1">{s("LINK-006")}</a>
      <a href="">{s("LINK-007")}</a>
      <a>{s("LINK-008")}</a>
      <a href="/duplicate-link">{s("LINK-009")}</a>
      <a href="/duplicate-link">{s("LINK-010")} alternate label</a>
      <a href="/same-label-a">{s("LINK-011")}</a>
      <a href="/same-label-b">{s("LINK-011")}</a>
      <a href="/nested-inline/">
        {s("LINK-012")}
        <span>nested inline</span>
      </a>
      <a href="/block-anchor/">
        {s("LINK-013")}
        <div>block child</div>
      </a>
      <a href="/code-anchor/">
        <code>{s("LINK-014")}</code>
      </a>
      <a href="/textless/">
        <br />
      </a>
      <a href="/aria-only/" aria-label={s("LINK-016")} />
      <a href="/image-only/">
        <img src="/assets/baseline.svg" alt={s("LINK-017")} />
      </a>
      <a href="/image-and-text/">
        <img src="/assets/baseline.svg" alt="link image" />
        {s("LINK-018")}
      </a>
      <a href="mailto:calibration@example.test">{s("LINK-019")}</a>
      <a href="mailto:calibration@example.test">
        <img src="/assets/baseline.svg" alt={s("LINK-020")} />
      </a>
      <a href="tel:+12065550123">{s("LINK-021")}</a>
      <a href="tel:+12065550124">
        <img src="/assets/baseline.svg" alt={s("LINK-022")} />
      </a>
      <RawHtml html={`<a href="javascript:void(0)">${s("LINK-023")}</a>`} />
      <a href="data:text/plain,fixture">{s("LINK-024")}</a>
      <RawHtml html={`<a href="http://[invalid">${s("LINK-025")}</a>`} />
      <a href="/blank-target/" target="_blank" rel="noreferrer">
        {s("LINK-026")}
      </a>
      <a href="/nofollow/" rel="nofollow">
        {s("LINK-027")}
      </a>
      <a href="/sponsored/" rel="sponsored">
        {s("LINK-028")}
      </a>
      <a href="/download.txt" download>
        {s("LINK-029")}
      </a>
      <a href="/alternate/" hrefLang="fr">
        {s("LINK-030")}
      </a>
      <div id="link-fragment-target">fragment target</div>
    </TestCase>
  );
}

function ImageFixtures() {
  return (
    <TestCase>
      <img src="/assets/pixel.png" alt={s("IMG-001")} />
      <img src="/assets/baseline.svg?img=002" title={s("IMG-002")} alt="" />
      <img src="/assets/baseline.svg?img=003" title={s("IMG-003")} alt="conflicting alt" />
      <img src="/assets/baseline.svg?img=004" alt="" />
      <img src="/assets/baseline.svg?img=005" />
      <img src="assets/baseline.svg?img=006" alt={s("IMG-006")} />
      <img src="https://www.w3.org/Icons/w3c_home.png" alt={s("IMG-007")} />
      <img src="/assets/baseline.svg?duplicate=1" alt={s("IMG-008")} />
      <img src="/assets/baseline.svg?duplicate=1" alt="second duplicate label" />
      <img src="/assets/baseline.svg?img=009" alt={s("IMG-009")} loading="lazy" />
      <img src="/assets/baseline.svg?img=010" alt={s("IMG-010")} width={0} height={0} />
      <img src="/assets/baseline.svg?img=011" alt={s("IMG-011")} hidden />
      <img src="/assets/baseline.svg?img=012" alt="" hidden />
      <picture>
        <source media="(min-width: 1px)" srcSet="/assets/baseline.svg?picture-source=1" />
        <img src="/assets/baseline.svg?img=013" alt={s("IMG-013")} />
      </picture>
      <img
        src="/assets/baseline.svg?img=014"
        srcSet="/assets/baseline.svg?img=014-1 1x, /assets/baseline.svg?img=014-2 2x"
        alt={s("IMG-014")}
      />
      <svg viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="15">
          {s("IMG-015")}
        </text>
      </svg>
      <svg viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
        <title>{s("IMG-016")}</title>
        <desc>inline SVG description</desc>
      </svg>
      <img src="https://www.w3.org/Icons/SVG/svg-logo-h.svg" alt={s("IMG-017")} />
      <figure>
        <img src="/assets/baseline.svg?img=018" alt="figure image" />
        <figcaption>{s("IMG-018")}</figcaption>
      </figure>
      <canvas>{s("IMG-019")}</canvas>
      <video>{s("IMG-020")}</video>
      <audio>{s("IMG-021")}</audio>
    </TestCase>
  );
}

function SupportPage({ text }: { text: string }) {
  return <Document head={<title>{text}</title>} body={<p>{text}</p>} />;
}

function FrameFixtures() {
  return (
    <TestCase>
      <iframe src="/frame/child-one/" title={s("FRAME-001")} />
      <iframe src="/frame/child-two/" />
      <iframe src="https://example.com/" title={s("FRAME-003")} />
      <iframe src="/frame/child-four/" title="fallback frame">
        {s("FRAME-004")}
      </iframe>
      <iframe src="/frame/child-five/" title={s("FRAME-005")} hidden />
    </TestCase>
  );
}

function TableFixtures() {
  return (
    <TestCase>
      <table>
        <thead>
          <tr>
            <th>{s("TABLE-001")} Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Pro</td>
            <td>$5</td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td>{s("TABLE-002")} no header</td>
            <td>value</td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <th>{s("TABLE-003")} row header</th>
            <td>value</td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>{s("TABLE-004")} head</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>body</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>foot</td>
          </tr>
        </tfoot>
      </table>
      <table>
        <caption>{s("TABLE-005")} caption</caption>
        <tbody>
          <tr>
            <td>cell</td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td>{s("TABLE-006")} nonempty</td>
            <td />
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td colSpan={2}>{s("TABLE-007")} colspan</td>
          </tr>
          <tr>
            <td>A</td>
            <td>B</td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td rowSpan={2}>{s("TABLE-008")} rowspan</td>
            <td>A</td>
          </tr>
          <tr>
            <td>B</td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td>
              <strong>{s("TABLE-009")}</strong> inline
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td>
              <a href="/table-link/">{s("TABLE-010")}</a>
              <img src="/assets/baseline.svg?table=010" alt="table image" />
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td>
              {s("TABLE-011")}
              <table>
                <tbody>
                  <tr>
                    <td>nested table</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <RawHtml html={`<table><tr><td>${s("TABLE-012")} malformed<div><td>nested cell</table>`} />
      <table>
        <thead>
          <tr>
            <th style={{ display: "none" }}>{s("TABLE-013")}</th>
            <th>visible header</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>hidden-column value</td>
            <td>visible value</td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <th scope="row">{s("TABLE-014")} scoped row</th>
            <td>value</td>
          </tr>
        </tbody>
      </table>
    </TestCase>
  );
}

function InternationalFixtures() {
  return (
    <TestCase>
      <p>{s("I18N-001")} café déjà vu</p>
      <p>{s("I18N-002")} 中文校准测试</p>
      <p dir="rtl">{s("I18N-003")} مرحبا بالعالم</p>
      <p>{s("I18N-004")} שלום עולם</p>
      <p>{s("I18N-005")} 😀🧪</p>
      <p>{`${s("I18N-006")} alpha\u00a0beta`}</p>
      <p>{`${s("I18N-007")} alpha\u200bbeta`}</p>
      <p>{`${s("I18N-008")} soft\u00adhyphen`}</p>
      <p>{`${s("I18N-009")} decomposed e\u0301 precomposed é`}</p>
      <p>{`${s("I18N-010")} left\u202eright\u202c`}</p>
      <p>{s("I18N-011")} literal 【source】 dagger †</p>
      <RawHtml html={`<p>${s("I18N-012")} &amp; &#169; &eacute;</p>`} />
      <p lang="fr">{s("I18N-013")} English content with French lang metadata</p>
    </TestCase>
  );
}

function KitchenSinkPage() {
  return (
    <Document
      head={
        <>
          <title>View as AI Kitchen Sink Fixture</title>
          <link rel="stylesheet" href="/assets/kitchen-sink-visibility.css" />
          <style>{embeddedVisibilityCss}</style>
        </>
      }
      body={
        <>
          <TextFixtures />
          <VisibilityFixtures />
          <SemanticFixtures />
          <ControlFixtures />
          <LinkFixtures />
          <ImageFixtures />
          <FrameFixtures />
          <TableFixtures />
          <InternationalFixtures />
        </>
      }
    />
  );
}

function VisibilityThirtyPage() {
  return (
    <Document
      head={
        <>
          <title>VIS-030 Fixture</title>
          <style>{".hidden-md { display: none; }"}</style>
        </>
      }
      body={<div className="hidden-md">{s("VIS-030")}</div>}
    />
  );
}

function LinkBasePage({ testId, base }: { testId: "LINK-031" | "LINK-033"; base: string }) {
  return (
    <Document
      head={
        <>
          <title>{`${testId} Fixture`}</title>
          <base href={base} />
        </>
      }
      body={<a href="guide">{s(testId)}</a>}
    />
  );
}

export const kitchenSinkRoutes: FixtureRoute[] = [
  {
    kind: "tsx",
    path: "/kitchen-sink/",
    render: () => <KitchenSinkPage />,
    metadata: {
      phase: 2,
      source: "src/fixtures/kitchen-sink.tsx",
      testIds: kitchenSinkIds,
      sentinels: kitchenSinkSentinels,
    },
  },
  {
    kind: "tsx",
    path: "/experiments/visibility/VIS-030/",
    render: () => <VisibilityThirtyPage />,
    metadata: {
      phase: 2,
      source: "src/fixtures/kitchen-sink.tsx",
      testIds: ["VIS-030"],
      sentinels: { "VIS-030": s("VIS-030") },
    },
  },
  {
    kind: "tsx",
    path: "/experiments/link/LINK-031/",
    render: () => <LinkBasePage testId="LINK-031" base="/base-assets/" />,
    metadata: {
      phase: 2,
      source: "src/fixtures/kitchen-sink.tsx",
      testIds: ["LINK-031"],
      sentinels: { "LINK-031": s("LINK-031") },
    },
  },
  {
    kind: "raw",
    path: "/experiments/link/LINK-032/",
    render: () =>
      `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>LINK-032 Fixture</title><base href="javascript:bad"></head><body><a href="/ok">${s("LINK-032")}</a></body></html>\n`,
    metadata: {
      phase: 2,
      source: "src/fixtures/kitchen-sink.tsx",
      testIds: ["LINK-032"],
      sentinels: { "LINK-032": s("LINK-032") },
    },
  },
  {
    kind: "tsx",
    path: "/experiments/link/LINK-033/",
    render: () => <LinkBasePage testId="LINK-033" base="https://example.com/base/" />,
    metadata: {
      phase: 2,
      source: "src/fixtures/kitchen-sink.tsx",
      testIds: ["LINK-033"],
      sentinels: { "LINK-033": s("LINK-033") },
    },
  },
  ...[1, 2, 4, 5].map<FixtureRoute>((number) => ({
    kind: "tsx",
    path: `/frame/child-${["zero", "one", "two", "three", "four", "five"][number]}/`,
    render: () => (
      <Document
        head={<title>{`Frame child ${number}`}</title>}
        body={<p>{`VAI_FRAME_CHILD_${number}_CONTENT`}</p>}
      />
    ),
    metadata: {
      phase: 2,
      source: "src/fixtures/kitchen-sink.tsx",
      testIds: [],
      notes: "Supporting iframe child document.",
    },
  })),
  ...[
    ["/relative-target/", "Relative same-origin target"],
    ["/absolute-target/", "Absolute same-origin target"],
  ].map<FixtureRoute>(([path, text]) => ({
    kind: "tsx",
    path,
    render: () => <SupportPage text={text} />,
    metadata: {
      phase: 2,
      source: "src/fixtures/kitchen-sink.tsx",
      testIds: [],
      notes: "Supporting same-origin link target.",
    },
  })),
];

export const kitchenSinkAssets: StaticAsset[] = [
  {
    path: "/assets/kitchen-sink-visibility.css",
    source: "src/assets/kitchen-sink-visibility.css",
  },
  {
    path: "/assets/pixel.png",
    source: "src/assets/pixel.png",
  },
];
