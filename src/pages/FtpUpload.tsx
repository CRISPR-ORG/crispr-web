import { useScrollReveal } from "../hooks/useScrollReveal"
import {
  PageHeader,
  Shell,
  SectionLabel,
  CodeBlock,
  Status,
  Button,
  ArrowLink,
} from "../components/ui"

export default function FtpUpload() {
  useScrollReveal()

  return (
    <div>
      <PageHeader
        path="/ftp-upload"
        title="FTP Upload"
        subtitle="Contribute courses, academic materials, and multimedia to the campus server. Read the guidelines before you push."
        meta={<Status label="Online" />}
      />

      <section className="pb-24 md:pb-40">
        <Shell>
          <div className="max-w-3xl">
            <SectionLabel num="01">Guidelines</SectionLabel>
            <div className="reveal mt-7">
              <CodeBlock filename="root@crispr ~/FTP/upload # cat guidelines.txt">
                <p className="mb-4">
                  We understand that you may want to contribute to the
                  server, and in all fairness, it&apos;s for a noble cause.
                  We appreciate you for it.
                </p>
                <p className="mb-4">
                  However, there are a few things you must keep in mind
                  before pushing files to the network. First and foremost, we
                  are accepting courses, academic materials, and multimedia.
                  Multimedia may consist of movies, anime, web series, and
                  documentaries.
                </p>
                <p className="mb-4">
                  That being said, please understand that the server is a
                  public asset and falls under scrutiny.{" "}
                  <span className="k">
                    Uploading porn, hentai, or other objectionable material
                  </span>{" "}
                  will jeopardize the server for everyone. The administration
                  has threatened to shut down the server if any such
                  incidents occur.
                </p>
                <p className="mb-4">
                  In case you are penetration testing the server, let us
                  know. We can do it together! There is no need to try and
                  inject viruses, which may cause a thousand people to lose
                  access to the oasis of knowledge we have built. Please use
                  your rational mind and refrain from earning a despicable
                  reputation.
                </p>
                <p>
                  All content uploaded will be scrutinized for malice first
                  and then shifted to the main server by the CRISPR moderator
                  team. You may notice that the content you have uploaded
                  disappears after a while. This is normal. Your data has
                  been successfully received and is processing.
                </p>
              </CodeBlock>
            </div>

            <div className="reveal reveal-d1 mt-10">
              <Button
                href="https://crispr.iiitn.ac.in/upload.pdf"
                variant="primary"
                arrow
              >
                Proceed to Upload File
              </Button>
            </div>
          </div>

          <div
            className="mt-20 pt-8 flex items-center justify-between max-w-3xl"
            style={{ borderTop: "1px solid var(--line)" }}
          >
            <span className="t-mono">CRISPR / FTP / Upload</span>
            <ArrowLink to="/">Back to home</ArrowLink>
          </div>
        </Shell>
      </section>
    </div>
  )
}
