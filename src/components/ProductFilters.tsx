import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductFiltersProps {
  category: string;
  sortBy: string;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
}

export const ProductFilters = ({ category, sortBy, onCategoryChange, onSortChange }: ProductFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="flex-1">
        <label className="text-sm font-medium mb-2 block">Categoria</label>
        <div className="flex gap-2">
          <Button
            variant={category === "todos" ? "default" : "outline"}
            onClick={() => onCategoryChange("todos")}
            className="flex-1"
          >
            Todos
          </Button>
          <Button
            variant={category === "colchoes" ? "default" : "outline"}
            onClick={() => onCategoryChange("colchoes")}
            className="flex-1"
          >
            Colchões
          </Button>
          <Button
            variant={category === "moveis" ? "default" : "outline"}
            onClick={() => onCategoryChange("moveis")}
            className="flex-1"
          >
            Móveis
          </Button>
        </div>
      </div>
      
      <div className="flex-1">
        <label className="text-sm font-medium mb-2 block">Ordenar por</label>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent className="bg-background border border-border z-50">
            <SelectItem value="popular">Mais Populares</SelectItem>
            <SelectItem value="price-asc">Menor Preço</SelectItem>
            <SelectItem value="price-desc">Maior Preço</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
