'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/utils/api';
import { Button } from "@/components/ui/button";
import { SearchHeader } from '@/components/ui/searchHeader';
import { ProductCard } from '@/components/ui/productCard'; // importe o ProductCard

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image_url: string;
};

export default function Home() {
  const router = useRouter();

  // Estados para lista e modal
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Estados do formulário
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    loadProducts();
  }, []);

  // Log out
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  async function loadProducts() {
    try {
      const res = await api.get('/products');
      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
      router.push('/login');
    }
  }

  function openCreateModal() {
    setEditingProduct(null);
    setTitle('');
    setDescription('');
    setPrice('');
    setImageUrl('');
    setIsModalOpen(true);
  }

  function openEditModal(product: Product) {
    setEditingProduct(product);
    setTitle(product.title);
    setDescription(product.description);
    setPrice(product.price.toString());
    setImageUrl(product.image_url);
    setIsModalOpen(true);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct.id}`, {
          title,
          description,
          price: parseFloat(price),
          image_url: imageUrl,
        });
        setAlertMessage('Produto atualizado com sucesso!');
      } else {
        await api.post('/products', {
          title,
          description,
          price: parseFloat(price),
          image_url: imageUrl,
        });
        setAlertMessage('Produto criado com sucesso!');
      }

      setIsModalOpen(false);
      loadProducts();
    } catch (err: any) {
      const errors = err.response?.data?.errors;

      if (Array.isArray(errors) && errors.length > 0) {
        setError(errors[0].message);
      } else {
        setError(err.response?.data?.message || 'Erro inesperado ao salvar o produto.');
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que quer excluir esse produto?')) return;

    try {
      await api.delete(`/products/${id}`);
      setAlertMessage('Produto excluído com sucesso!');
      loadProducts();
    } catch (err) {
      console.error('Erro ao excluir produto:', err);
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Produtos</h1>

      {alertMessage && (
        <div
          className="mb-4 p-3 bg-green-200 text-green-900 rounded"
          role="alert"
          onAnimationEnd={() => setAlertMessage('')}
          style={{ animation: 'fadeOut 3s forwards' }}
        >
          {alertMessage}
        </div>
      )}

      <SearchHeader
        onNewProductClick={openCreateModal}
        onLogoutClick={handleLogout}
      />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-10 rounded-lg w-full max-w-md shadow-lg relative">

            {/* Botão X no canto superior direito */}
            <button
              onClick={() => {
                setIsModalOpen(false);
                setError(null);
              }}
              className="absolute top-2 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold cursor-pointer"
              aria-label="Fechar modal"
            >
              ×
            </button>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              {error && (
                <div className="text-red-600 bg-red-100 px-3 py-2 rounded">
                  {error}
                </div>
              )}

              <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Preço"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border p-2 rounded"
                required
                step="0.01"
              />
              <input
                type="text"
                placeholder="URL da imagem"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="border p-2 rounded"
              />
              <Button type="submit" className="w-full text-white bg-green-600 hover:bg-green-700 transition cursor-pointer">
                {editingProduct ? 'Salvar alterações' : 'Criar Produto'}
              </Button>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={() => openEditModal(product)}
            onDelete={() => handleDelete(product.id)}
          />
        ))}
      </div>
    </div>
  );
}
