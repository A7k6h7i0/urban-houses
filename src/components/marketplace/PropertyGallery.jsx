import { useState } from "react";
import { Expand } from "lucide-react";
import { placeholderImage } from "../../utils/placeholders";

export function PropertyGallery({ images, title }) {
  const list = images?.length ? images : [placeholderImage(title)];
  const [active, setActive] = useState(list[0]);

  return (
    <div className="space-y-4">
      <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-soft">
        <img src={active} alt={title} className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
        <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-slate-950/60 p-2 text-white/70 backdrop-blur-md">
          <Expand className="h-4 w-4" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {list.map((image) => (
          <button
            key={image}
            onClick={() => setActive(image)}
            className={`overflow-hidden rounded-2xl border transition ${active === image ? "border-brand-400 ring-2 ring-brand-400/30" : "border-white/10 hover:border-white/25"}`}
          >
            <img src={image} alt={title} className="aspect-[4/3] w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
