import { useScrollReveal } from "../hooks/useScrollReveal"
import { PageHeader, Shell, SectionLabel, CodeBlock, Status, ArrowLink } from "../components/ui"

export default function AuthBahn() {
  useScrollReveal()

  return (
    <div>
      <PageHeader
        path="/authbahn"
        title="AuthBahn"
        subtitle="Forget the campus captive portal login, forever. A zero-telemetry Chrome extension built in-house at CRISPR."
        meta={
          <div className="flex flex-wrap items-center gap-4">
            <Status label="Production" />
            <span className="t-mono">Public since Apr 15, 2024</span>
          </div>
        }
      />

      <section className="pb-24 md:pb-40">
        <Shell>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 gap-x-8">
            {/* README */}
            <div className="lg:col-span-7">
              <SectionLabel num="01">Readme</SectionLabel>
              <div className="reveal mt-7">
                <CodeBlock filename="">
                  <p className="mb-4">
                    This is a Chrome extension you can use to forever forget
                    the pain of logging into the campus network again. This is
                    one of many in-house solutions made by CRISPR.
                  </p>
                  <p className="mb-4">
                    Having been in private use since at least April 15, 2024,
                    we have finally decided to open it to the community.
                  </p>
                  <p className="mb-4 text-[color:var(--color-crispr-light)]">
                    AuthBahn Execution Demo
                  </p>
                  <p className="mb-4">
                    To install this extension, turn on Developer Mode in your
                    browser. Unzip the downloaded file and load the extension
                    in the chrome://extensions tab. If you have any doubts, a
                    quick search for &quot;How to load an unpacked extension
                    in Chrome&quot; will guide you.
                  </p>
                  <p className="mb-4">
                    <span className="k">Zero Telemetry</span>: Data is not
                    sent to CRISPR&apos;s servers. Your credentials are
                    strictly stored locally within your own browser storage.
                    That&apos;s about it.
                  </p>
                  <p>
                    Write to{" "}
                    <a
                      href="mailto:crispr@iiitn.ac.in"
                      className="link-underline text-[color:var(--color-crispr-light)]"
                    >
                      crispr@iiitn.ac.in
                    </a>{" "}
                    to express your feedback or report bugs.
                  </p>
                </CodeBlock>
              </div>

              <div className="reveal reveal-d1 mt-10 grid grid-cols-2 gap-8">
                <div>
                  <div className="t-mono mb-2">Authors</div>
                  <ul className="t-body space-y-1">
                    <li>Ayush Khushwah (Batch &apos;25)</li>
                    <li>Krishna Chaudhari (Batch &apos;25)</li>
                  </ul>
                </div>
                <div>
                  <div className="t-mono mb-2">Origin lore</div>
                  <p className="t-body">
                    The name AuthBahn is derived from AutoBahn, the legendary
                    highways with no speed limit in Germany. Fast.
                    Unrestricted.
                  </p>
                </div>
              </div>
            </div>

            {/* Demo */}
            <div className="lg:col-span-5">
              <SectionLabel num="02">Execution demo</SectionLabel>
              <div
                className="reveal mt-7 border p-2"
                style={{ borderColor: "var(--line)", background: "#0A0F0D" }}
              >
                <img
                  src="/authBahn/authbahn.gif"
                  alt="AuthBahn execution demo"
                  className="w-full h-auto"
                />
              </div>
              <a
                href="/authBahn/AuthBahn.zip"
                download
                className="btn btn-primary reveal reveal-d1 mt-6"
              >
                <span>Download AuthBahn.zip</span>
                <span className="arrow" aria-hidden>
                  ↓
                </span>
              </a>
            </div>
          </div>

          <div
            className="mt-20 pt-8 flex items-center justify-between"
            style={{ borderTop: "1px solid var(--line)" }}
          >
            <span className="t-mono">CRISPR / TechMill / AuthBahn</span>
            <ArrowLink to="/">Back to home</ArrowLink>
          </div>
        </Shell>
      </section>
    </div>
  )
}
