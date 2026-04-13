import { Search } from "lucide-react";
import { propertyGoals, propertyTypes, sortOptions } from "../../constants/propertyTypes";
import { featuredCities } from "../../constants/cities";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";

export function PropertyFilters({ value, onChange, onReset, onViewToggle, view }) {
  const update = (key, next) => onChange({ ...value, [key]: next });

  return (
    <div className="panel space-y-4 p-4">
      <div className="grid gap-4 lg:grid-cols-4">
        <div className="relative lg:col-span-2">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input value={value.q} onChange={(e) => update("q", e.target.value)} placeholder="Search by locality, project, or builder" className="pl-11" />
        </div>
        <Select value={value.city} onChange={(e) => update("city", e.target.value)}>
          <option value="">All Cities</option>
          {featuredCities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </Select>
        <Select value={value.sort} onChange={(e) => update("sort", e.target.value)}>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Select value={value.type} onChange={(e) => update("type", e.target.value)}>
          {propertyTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </Select>
        <Select value={value.purpose} onChange={(e) => update("purpose", e.target.value)}>
          <option value="All">Buy + Rent</option>
          {propertyGoals.map((goal) => (
            <option key={goal} value={goal}>{goal}</option>
          ))}
        </Select>
        <Input type="number" value={value.minPrice} onChange={(e) => update("minPrice", e.target.value)} placeholder="Min Price" />
        <Input type="number" value={value.maxPrice} onChange={(e) => update("maxPrice", e.target.value)} placeholder="Max Price" />
        <div className="flex gap-2">
          <Button variant="secondary" className="flex-1" onClick={onReset}>Reset</Button>
          <Button variant="ghost" className="flex-1 border border-white/10 bg-white/5" onClick={onViewToggle}>
            {view === "grid" ? "List View" : "Grid View"}
          </Button>
        </div>
      </div>
    </div>
  );
}
