import { useScrollReveal } from "../hooks/useScrollReveal"
import {
  PageHeader,
  Shell,
  SectionLabel,
  Status,
  ArrowLink,
  Button,
} from "../components/ui"

export default function Badal() {
  useScrollReveal()

  return (
    <div>
      <PageHeader
        path="/badal"
        title="BADAL"
        subtitle="Your one-stop solution for all essential resources at IIITN — a command away on Telegram."
        meta={<Status label="Active" />}
      />

      <section className="pb-24 md:pb-40">
        <Shell>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 gap-x-8">
            {/* Description */}
            <div className="lg:col-span-7">
              <SectionLabel num="01">What is BADAL?</SectionLabel>
              <p className="reveal t-lead mt-7 max-w-xl">
                Introducing BADAL, your one-stop solution for all essential
                resources at IIITN. From academic materials to hostel
                details, multimedia, and college information, BADAL ensures
                that everything you need is just a command away.
              </p>

              <div
                className="reveal reveal-d1 mt-10 pt-8"
                style={{ borderTop: "1px solid var(--line)" }}
              >
                <div className="t-mono mb-3 text-[color:var(--color-crispr)]">
                  How to access
                </div>
                <p className="t-body max-w-xl">
                  Go to the Telegram app and search for{" "}
                  <a
                    href="https://t.me/CRISPR_Online_Menu_Bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-[color:var(--color-crispr-light)]"
                  >
                    @CRISPR_Online_Menu_Bot
                  </a>{" "}
                  to interface with the system.
                </p>
              </div>

              <div className="reveal reveal-d2 mt-10 grid grid-cols-2 gap-8">
                <div>
                  <div className="t-mono mb-2">Maintainer</div>
                  <p className="t-body">
                    Harsh Vardhan
                    <br />
                    <span className="text-[0.8125rem] text-[color:var(--color-fg-3)]">
                      Head of Data Science @ CRISPR &apos;24–&apos;25
                    </span>
                  </p>
                </div>
                <div>
                  <div className="t-mono mb-2">Origin lore</div>
                  <p className="t-body">
                    Named after the Hindi word for &quot;cloud,&quot; BADAL
                    represents the ever-changing sky — always adapting to
                    deliver exactly what you need at IIITN.
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
                  src="/Badal/badal.gif"
                  alt="BADAL execution demo"
                  className="w-full h-auto"
                />
              </div>
              <div className="reveal reveal-d1 mt-6">
                <Button
                  href="https://t.me/CRISPR_Online_Menu_Bot"
                  variant="primary"
                  arrow
                >
                  Open in Telegram
                </Button>
              </div>
            </div>
          </div>

          <div
            className="mt-20 pt-8 flex items-center justify-between"
            style={{ borderTop: "1px solid var(--line)" }}
          >
            <span className="t-mono">CRISPR / BADAL</span>
            <ArrowLink to="/">Back to home</ArrowLink>
          </div>
        </Shell>
      </section>
    </div>
  )
}
