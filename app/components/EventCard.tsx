import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Event } from "../data/events";

interface EventCardProps {
    event: Event;
}

export default function EventCard({ event }: EventCardProps) {
    return (
        <div className="group relative flex flex-col items-start text-left p-6 md:p-8 bg-black/70 border border-white/20 hover:border-purple-500/50 transition-all duration-300 rounded-3xl hover:bg-white/5">
            {/* Corner Brackets Animation - Removed for cleaner look or kept but inside rounded? Keeping minimal */}

            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Calendar className="w-16 h-16 text-white" />
            </div>

            <div className="flex items-center gap-2 mb-4 text-purple-400 text-xs font-bold uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                <span>{event.date}</span>
            </div>

            <h3 className="text-xl font-bold uppercase mb-2 tracking-wide text-white group-hover:text-purple-300 transition-colors">
                {event.title}
            </h3>

            <div className="flex items-center gap-2 mb-4 text-[#71717a] text-xs font-mono">
                <MapPin className="w-3 h-3" />
                <span>{event.location}</span>
            </div>

            <p className="text-white/60 text-xs md:text-sm font-mono leading-relaxed mb-6 group-hover:text-white/90 transition-colors">
                {event.description}
            </p>

            <div className="mt-auto pt-4 border-t border-white/5 w-full flex justify-between items-center">
                <span className="text-xs uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                    Details
                </span>
                <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-purple-400 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
            </div>
        </div>
    );
}
