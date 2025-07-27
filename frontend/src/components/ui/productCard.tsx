'use client';

import { Button } from '@/components/ui/button';

interface Product {
  id: number;
  title: string;
  description?: string;
  price: number;
  image_url?: string;
}

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  const handleDelete = () => {
    if (confirm('Tem certeza que quer excluir esse produto?')) {
      onDelete(product.id);
    }
  };

  return (
    <div className="border p-4 rounded-xl shadow-md">
      <h2 className="font-semibold">{product.title}</h2>
      {product.description && <p>{product.description}</p>}
      <p>R$ {product.price.toFixed(2)}</p>
      {product.image_url && (
        <img
          src={product.image_url}
          alt={product.title}
          className="mt-2 w-full h-40 object-cover"
        />
      )}

      <div className="flex gap-2 mt-2">
        <Button
          onClick={() => onEdit(product)}
          variant="outline"
          className="px-3 py-1 cursor-pointer"
        >
          Editar
        </Button>

        <Button
          onClick={handleDelete}
          variant="destructive"
          className="px-3 py-1 cursor-pointer"
        >
          Excluir
        </Button>
      </div>
    </div>
  );
}
