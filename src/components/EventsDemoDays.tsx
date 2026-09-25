import { useState } from "react"
import { Shell, SectionLabel, Button } from "./ui"
import { events, EventItem } from "../data/events"

export default function EventsDemoDays() {
  const [filter, setFilter] = useState<string>("All")
  const [selectedEvent, setSelectedEvent] = useState<EventItem>(events[0])

  const filteredEvents =
    filter === "All"
      ? events
      : filter === "Upcoming"
        ? events.filter(
            (e) =>
              e.status === "Live" ||
              e.status === "Upcoming" ||
              e.status === "Registration Open",
          )
        : events.filter((e) => e.type === filter || e.status === filter)

  return (
    <section
      id="events"
      className="relative py-28 md:py-36 border-t border-[#15221c] z-20"
    >
      <Shell>
        <SectionLabel num="05">Arenas & Showcases</SectionLabel>

        {/* Section Headline */}
        <div className="mt-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#15221c]">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F2F4F2] leading-tight">
              Events & <span className="text-[#19A88F]">DemoDays.</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#A5AEA9] max-w-xl">
              From monthly open-mic build demonstrations to 24-hour AI
              solvathons, explore where student engineers ship and critique.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {["All", "Upcoming", "Hackathon", "Competition", "Showcase"].map(
              (f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-all duration-200 cursor-pointer border ${
                    filter === f
                      ? "bg-[#19A88F] text-[#050706] border-[#35D6B3] font-semibold"
                      : "bg-[#0A0F0D] text-[#A5AEA9] border-[#15221c] hover:border-[#19A88F]/50 hover:text-[#F2F4F2]"
                  }`}
                >
                  {f}
                </button>
              ),
            )}
          </div>
        </div>

        {/* Visual Timeline Layout */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Event Timeline Strip */}
          <div className="lg:col-span-6 space-y-4">
            <div className="font-mono text-xs text-[#68736E] uppercase tracking-wider mb-2">
              TIMELINE // SELECT EVENT TO INSPECT
            </div>

            <div className="space-y-3">
              {filteredEvents.map((evt) => {
                const isSelected = selectedEvent.id === evt.id
                return (
                  <div
                    key={evt.id}
                    onClick={() => setSelectedEvent(evt)}
                    className={`p-4 sm:p-5 border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                      isSelected
                        ? "bg-[#0A0F0D] border-[#19A88F] shadow-[0_0_20px_rgba(25,168,143,0.15)]"
                        : "bg-[#050706] border-[#15221c] hover:border-[#19A88F]/40"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 font-mono text-[10px]">
                        <span className="text-[#35D6B3] uppercase">
                          {evt.type}
                        </span>
                        <span className="text-[#68736E]">·</span>
                        <span className="text-[#A5AEA9]">{evt.date}</span>
                      </div>
                      <h3
                        className={`text-lg sm:text-xl font-bold tracking-tight ${
                          isSelected ? "text-[#35D6B3]" : "text-[#F2F4F2]"
                        }`}
                      >
                        {evt.name}
                      </h3>
                      <div className="text-xs text-[#68736E] font-mono">
                        {evt.location}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span
                        className={`inline-block font-mono text-[9px] uppercase tracking-wider px-2 py-1 border ${
                          evt.status === "Live"
                            ? "bg-[#19A88F]/20 text-[#35D6B3] border-[#35D6B3] animate-pulse"
                            : evt.status === "Upcoming" ||
                                evt.status === "Registration Open"
                              ? "bg-[#0A0F0D] text-[#19A88F] border-[#19A88F]"
                              : "bg-[#050706] text-[#68736E] border-[#15221c]"
                        }`}
                      >
                        {evt.status}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column: Featured Event Detail View & Poster */}
          <div className="lg:col-span-6 bg-[#0A0F0D] border border-[#15221c] p-6 lg:p-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#15221c] font-mono text-xs">
              <span className="text-[#19A88F] font-semibold">
                EVENT SPECIFICATION // {selectedEvent.num}
              </span>
              <span className="text-[#35D6B3] uppercase tracking-wider">
                {selectedEvent.status}
              </span>
            </div>

            {/* Poster thumbnail if available */}
            {selectedEvent.image && (
              <div className="relative h-48 sm:h-56 w-full overflow-hidden border border-[#15221c] bg-[#050706]">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.name}
                  className="w-full h-full object-cover object-center opacity-85 hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    // Fallback to placeholder if asset path is absent
                    ;(e.target as HTMLElement).style.display = "none"
                  }}
                />
              </div>
            )}

            <div>
              <div className="font-mono text-xs text-[#35D6B3] uppercase tracking-wider mb-1">
                {selectedEvent.type} · {selectedEvent.date} ·{" "}
                {selectedEvent.location}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F2F4F2]">
                {selectedEvent.name}
              </h3>
            </div>

            <p className="text-sm text-[#A5AEA9] leading-relaxed">
              {selectedEvent.description}
            </p>

            {/* Highlights List */}
            <div className="space-y-2 pt-2">
              <span className="font-mono text-[10px] text-[#68736E] uppercase tracking-wider block">
                Key Event Dimensions
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedEvent.highlights.map((h) => (
                  <span
                    key={h}
                    className="font-mono text-[11px] text-[#F2F4F2] px-3 py-1 bg-[#050706] border border-[#15221c]"
                  >
                    ✓ {h}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#15221c] flex items-center justify-between">
              <Button to="/events" variant="primary" arrow>
                View full events archive
              </Button>
              <span className="font-mono text-[10px] text-[#68736E]">
                IIIT NAGPUR
              </span>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  )
}
