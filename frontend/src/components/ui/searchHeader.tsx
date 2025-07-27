'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface SearchHeaderProps {
  onNewProductClick: () => void;
  onLogoutClick: () => void;
}

export function SearchHeader({ onNewProductClick, onLogoutClick }: SearchHeaderProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="flex justify-between items-center mb-4 gap-4">
      <Button
        onClick={onNewProductClick}
        variant="default"
        className="text-white bg-green-600 hover:bg-green-700 transition cursor-pointer"
      >
        Novo Produto
      </Button>

      <form onSubmit={handleSearchSubmit} className="flex flex-1 max-w-md">
        <input
          type="text"
          placeholder="Pesquisar produtos"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="flex-grow border p-2 rounded-l-md"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
        >
          Buscar
        </button>
      </form>

      <Button
        onClick={onLogoutClick}
        variant="destructive"
        className="cursor-pointer"
      >
        Sair
      </Button>
    </div>
  );
}