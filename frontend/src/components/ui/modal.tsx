'use client';

import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose} // fecha modal clicando no fundo escuro
    >
      <div
        className="bg-white p-10 rounded-lg w-full max-w-md shadow-lg relative"
        onClick={(e) => e.stopPropagation()} // evita fechar ao clicar no conteúdo
      >
        {/* Botão X no canto superior direito */}
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold cursor-pointer"
          aria-label="Fechar modal"
        >
          ×
        </button>

        {children}
      </div>
    </div>
  );
}
