'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SearchHeader } from '@/components/ui/searchHeader';
import { ProductCard } from '@/components/ui/productCard';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image_url: string;
};

export default function ProductSearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('search') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

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

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3333/products/search?query=${query}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data;
        setProducts(data.products ? data.products : data.product ? [data.product] : []);
      } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (query.trim()) {
      fetchProducts();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [query, router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  async function loadProducts() {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3333/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data.products);
    } catch (err) {
      console.error(err);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }

  function openCreateModal() {
    setEditingProduct(null);
    setTitle('');
    setDescription('');
    setPrice('');
    setImageUrl('');
    setError(null);
    setIsModalOpen(true);
  }

  function openEditModal(product: Product) {
    setEditingProduct(product);
    setTitle(product.title);
    setDescription(product.description);
    setPrice(product.price.toString());
    setImageUrl(product.image_url);
    setError(null);
    setIsModalOpen(true);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (editingProduct) {
        await axios.put(
          `http://localhost:3333/products/${editingProduct.id}`,
          {
            title,
            description,
            price: parseFloat(price),
            image_url: imageUrl,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setAlertMessage('Produto atualizado com sucesso!');
      } else {
        await axios.post(
          'http://localhost:3333/products',
          {
            title,
            description,
            price: parseFloat(price),
            image_url: imageUrl,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
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
      await axios.delete(`http://localhost:3333/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setAlertMessage('Produto excluído com sucesso!');
      loadProducts();
    } catch (err) {
      console.error('Erro ao excluir produto:', err);
    }
  };

  const goToHome = () => {
    router.push('/');
  };

  return (
    <div className="max-w-[1000px] mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Produtos</h1>
        <Button variant="outline" onClick={goToHome}>
          Voltar para Home
        </Button>
      </div>

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

      <SearchHeader onNewProductClick={openCreateModal} onLogoutClick={handleLogout} />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-10 rounded-lg w-full max-w-md shadow-lg relative">
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
                <div className="text-red-600 bg-red-100 px-3 py-2 rounded">{error}</div>
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
              <Button
                type="submit"
                className="w-full text-white bg-green-600 hover:bg-green-700 transition cursor-pointer"
              >
                {editingProduct ? 'Salvar alterações' : 'Criar Produto'}
              </Button>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <p>Carregando...</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={() => openEditModal(product)}
              onDelete={() => handleDelete(product.id)}
            />
          ))}
        </div>
      ) : (
        <p>Nenhum produto encontrado.</p>
      )}
    </div>
  );
}