'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        title: 'Tênis Esportivo',
        price: 199.90,
        description: 'Tênis confortável para corrida e caminhada.',
        image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Camiseta Casual',
        price: 49.90,
        description: 'Camiseta 100% algodão, várias cores disponíveis.',
        image_url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Mochila Escolar',
        price: 129.00,
        description: 'Mochila resistente com vários compartimentos.',
        image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Relógio Digital',
        price: 299.90,
        description: 'Relógio com cronômetro e resistência à água.',
        image_url: 'https://cf.shopee.com.br/file/1bfe63cd2d8d7759f9b3344cda4886d6',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Fones de Ouvido',
        price: 89.90,
        description: 'Fones com cancelamento de ruído e microfone.',
        image_url: 'https://site.fastshop.com.br/_next/image?url=https%3A%2F%2Ffastshopbr.vtexassets.com%2Farquivos%2Fids%2F495369%2F0_JBLT520BTAZL_PRD_1500_1.jpg%3Fv%3D638617860190670000&w=540&q=75',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
