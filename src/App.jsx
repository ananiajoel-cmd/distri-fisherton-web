import React, { useState, useRef, useMemo } from 'react';
import { ShoppingCart, Facebook, Instagram, Package, Tag, Truck, Check, Plus, Minus } from 'lucide-react';

const CONFIG = {
  whatsappNumber: '+5493412131449',
  socialLinks: {
    facebook: 'https://facebook.com/tusupermayorista',
    instagram: 'https://www.instagram.com/distri.fisherton?igsh=MXUyanluMjV6ZXVrYg=='
  },
  banner: {
    title: '¡Bienvenido a DistriFisherton!',
    subtitle: 'Los mejores precios al por mayor para tu negocio',
    cta: 'Explorar Productos'
  },
  products: [
    {
      id: 20,
      name: 'Cerveza Isenbeck 473ml',
      description: 'Cerveza premium en botella de 473ml',
      image: 'https://ardiaprod.vtexassets.com/arquivos/ids/334655-500-auto?v=638635545458400000&width=500&height=auto&aspect=true',
      options: [
        { id: 'pack6', name: 'Pack x6', quantity: 6, price: 7000 },
        { id: 'caja24', name: 'Caja x24', quantity: 24, price: 24500 }
      ]
    },
    {
      id: 21,
      name: 'Cerveza Brahma 473ml',
      description: 'Cerveza premium en botella de 473ml',
      image: 'https://www.ciprianomayorista.com.ar/wp-content/uploads/2021/01/3756.jpg',
      options: [
        { id: 'pack6', name: 'Pack x6', quantity: 6, price: 9000 },
        { id: 'caja24', name: 'Caja x24', quantity: 24, price: 32000 }
      ]
    },
    {
      id: 25,
      name: 'Cerveza Corona 473ml',
      description: 'Cerveza premium en lata de 473ml',
      image: 'https://jumboargentina.vtexassets.com/arquivos/ids/890567/Cerveza-473-Cc-Corona-1-1018884.jpg?v=638987206333400000',
      options: [
        { id: 'pack6', name: 'Pack x6', quantity: 6, price: 10000 },
        { id: 'caja24', name: 'Caja x24', quantity: 24, price: 37000 }
      ]
    },
    {
      id: 26,
      name: 'Agua Saborizada Rumipal 1.5L',
      description: 'Agua saborizada en botella de 1.5 litros',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiTYjE3zEBKkbBkvexG76q0yGimJtEk99QzWMOymUjJHqLSVMrj7XiYnA&s=10',
      options: [
        { id: 'naranja', name: 'Naranja', quantity: 6, price: 4800 },
        { id: 'manzana', name: 'Manzana', quantity: 6, price: 4800 },
        { id: 'pomelo', name: 'Pomelo', quantity: 6, price: 4800 }
      ]
    },
    {
      id: 22,
      name: 'Vino Toro Tinto 1L',
      description: 'Vino tinto en tetrabrick de 1 litro',
      image: 'https://jumboargentina.vtexassets.com/arquivos/ids/652992/Vino-Toro-Tinro-Brk-1000cc-1-853904.jpg?v=637603170416900000',
      options: [
        { id: 'pack6', name: 'Pack x6', quantity: 6, price: 10000 },
        { id: 'caja12', name: 'Caja x12', quantity: 12, price: 19000 }
      ]
    },
    {
      id: 23,
      name: 'Vino Toro Blanco 1L',
      description: 'Vino blanco en tetrabrick de 1 litro',
      image: 'https://arcordiezb2c.vteximg.com.br/arquivos/ids/167425/Vino-Blanco-Tetra-Brik-Toro-1-Lt-1-9479.jpg?v=637733002239570000',
      options: [
        { id: 'pack6', name: 'Pack x6', quantity: 6, price: 9000 },
        { id: 'caja12', name: 'Caja x12', quantity: 12, price: 16500 }
      ]
    },
    {
      id: 24,
      name: 'Vino Canciller Blend 1.125L',
      description: 'Vino en botella de 1.125 litros - Pack de 6 unidades',
      image: 'https://www.lacoopeencasa.coop/media/lcec/publico/articulos/1/f/d/1fda56235f97ed43a2e7e9b4fc0a8560',
      options: [
        { id: 'tinto', name: 'Tinto', quantity: 6, price: 13800 },
        { id: 'blanco-dulce', name: 'Blanco Dulce', quantity: 6, price: 13800 }
      ]
    },
    {
      id: 4,
      name: 'Cerveza Budweiser 355ml',
      description: 'Pack ideal para comercios y eventos',
      image: 'https://acdn-us.mitiendanube.com/stores/005/110/462/products/1080-x-1080-2025-04-25t141134-656-75168c95831c26bd0d17456013386220-1024-1024.webp',
      options: [
        { id: 'pack6', name: 'Pack x6', quantity: 6, price: 7800 },
        { id: 'box24', name: 'Caja x24', quantity: 24, price: 26500 }
      ]
    },
    {
      id: 10,
      name: 'Jugos BIG C 200ml',
      description: 'Pack de 18 unidades con 4 sabores disponibles',
      image: 'https://static.wixstatic.com/media/2d0188_10727abf8dde4a65bb814cbe1d80220e~mv2.jpg/v1/fill/w_480,h_480,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/2d0188_10727abf8dde4a65bb814cbe1d80220e~mv2.jpg',
      flavors: ['Pera', 'Multifrutal', 'Manzana', 'Durazno'],
      pricePerPack: 5500
    },
    {
      id: 11,
      name: 'Jugos BIG C 1L',
      description: 'Pack de 12 unidades con 4 sabores disponibles',
      image: 'https://bigarsa.com.ar/wp-content/uploads/2019/01/big-choice-todos-los-jugos-1024x535.jpg',
      flavors: ['Pera', 'Multifrutal', 'Manzana', 'Durazno'],
      pricePerPack: 11000
    },
    {
      id: 5,
      name: 'Gaseosa Rumipal 2.25L',
      description: 'Bebida refrescante en presentación familiar con 4 sabores disponibles',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2GBLskx-gO8L6fw2HJ9xarcShUhH2wkJ-AJjV2lazZM6Zv4bYDUPrbtc&s=10',
      flavors: ['Cola', 'Limón', 'Lima Limón', 'Naranja'],
      pricePerPack: 5600
    },
    {
      id: 6,
      name: 'Yerba Mañanita 500g',
      description: 'Yerba tradicional de alta calidad',
      image: 'https://farmacityar.vtexassets.com/arquivos/ids/244751/234163_yerba-mate-mananita-x-500-g_imagen-1.jpg?v=638247631354100000',
      options: [
        { id: 'pack3', name: 'Pack x3', quantity: 3, price: 5500 },
        { id: 'pack6', name: 'Pack x6', quantity: 6, price: 10800 }
      ]
    },
    {
      id: 8,
      name: 'Yerba Taragüí 500g',
      description: 'Yerba clásica con sabor intenso y tradicional',
      image: 'https://acdn-us.mitiendanube.com/stores/002/098/144/products/tienda-nube-041-c96cae8ba5296ecf2516641501828668-1024-1024.webp',
      options: [
        { id: 'pack3', name: 'Pack x3', quantity: 3, price: 5500 },
        { id: 'pack6', name: 'Pack x6', quantity: 6, price: 10800 }
      ]
    },
    {
      id: 9,
      name: 'Yerba Unión 500g',
      description: 'Yerba premium con sabor suave y equilibrado',
      image: 'https://acdn-us.mitiendanube.com/stores/001/458/724/products/plantilla_fotos_productos_fika-1162b5ee26939897b517298808725794-1024-1024.webp',
      options: [
        { id: 'pack3', name: 'Pack x3', quantity: 3, price: 5500 },
        { id: 'pack6', name: 'Pack x6', quantity: 6, price: 10800 }
      ]
    }
  ],
  weeklyOffers: []
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0
  }).format(price);
};

export default function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [rumipalConfigs, setRumipalConfigs] = useState([]);
  const [bigCConfigs, setBigCConfigs] = useState([]);
  const productsRef = useRef(null);

  const sortedProducts = useMemo(() => {
    return [...CONFIG.products].sort((a, b) => 
      a.name.localeCompare(b.name, 'es', { sensitivity: 'base' })
    );
  }, []);

  const scrollToProducts = () => {
    if (productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const addRumipalConfig = () => {
    setRumipalConfigs([...rumipalConfigs, { id: Date.now(), packs: 1, flavors: [] }]);
  };

  const updateRumipalPacks = (configId, newPacks) => {
    if (newPacks < 1) return;
    setRumipalConfigs(rumipalConfigs.map(config => 
      config.id === configId ? { ...config, packs: newPacks } : config
    ));
  };

  const toggleRumipalFlavor = (configId, flavor) => {
    setRumipalConfigs(rumipalConfigs.map(config => {
      if (config.id === configId) {
        const currentFlavors = config.flavors || [];
        if (currentFlavors.includes(flavor)) {
          return { ...config, flavors: currentFlavors.filter(f => f !== flavor) };
        } else {
          return { ...config, flavors: [...currentFlavors, flavor] };
        }
      }
      return config;
    }));
  };

  const removeRumipalConfig = (configId) => {
    setRumipalConfigs(rumipalConfigs.filter(config => config.id !== configId));
  };

  const addBigCConfig = (productId) => {
    setBigCConfigs([...bigCConfigs, { id: Date.now(), productId, packs: 1, flavors: [] }]);
  };

  const updateBigCPacks = (configId, newPacks) => {
    if (newPacks < 1) return;
    setBigCConfigs(bigCConfigs.map(config => 
      config.id === configId ? { ...config, packs: newPacks } : config
    ));
  };

  const toggleBigCFlavor = (configId, flavor) => {
    setBigCConfigs(bigCConfigs.map(config => {
      if (config.id === configId) {
        const currentFlavors = config.flavors || [];
        if (currentFlavors.includes(flavor)) {
          return { ...config, flavors: currentFlavors.filter(f => f !== flavor) };
        } else {
          return { ...config, flavors: [...currentFlavors, flavor] };
        }
      }
      return config;
    }));
  };

  const removeBigCConfig = (configId) => {
    setBigCConfigs(bigCConfigs.filter(config => config.id !== configId));
  };

  const addToCart = (item, type = 'product') => {
    if (type === 'offer') {
      const cartItem = {
        id: `offer-${item.id}`,
        name: item.name,
        description: item.description,
        quantity: 1,
        price: item.price,
        totalPrice: item.price,
        isOffer: true
      };
      
      const existingItem = cart.find(existing => existing.id === cartItem.id);
      if (existingItem) {
        setCart(cart.map(existing => 
          existing.id === cartItem.id 
            ? { ...existing, quantity: existing.quantity + 1, totalPrice: existing.totalPrice + cartItem.price }
            : existing
        ));
      } else {
        setCart([...cart, cartItem]);
      }
    } else if (item.product.id === 5) {
      rumipalConfigs.forEach(config => {
        if (config.flavors.length > 0) {
          const rumipalItem = {
            id: `rumipal-${config.id}`,
            name: `Gaseosa Rumipal 2.25L`,
            optionName: `Pack x6 (${config.flavors.join(', ')})`,
            packs: config.packs,
            quantity: config.packs * 6,
            price: CONFIG.products.find(p => p.id === 5).pricePerPack,
            totalPrice: config.packs * CONFIG.products.find(p => p.id === 5).pricePerPack,
            flavors: config.flavors
          };
          setCart(prevCart => {
            const existing = prevCart.find(existingItem => existingItem.id === rumipalItem.id);
            if (existing) {
              return prevCart.map(existingItem => 
                existingItem.id === rumipalItem.id
                  ? { ...existingItem, quantity: existingItem.quantity + rumipalItem.quantity, totalPrice: existingItem.totalPrice + rumipalItem.totalPrice, packs: existingItem.packs + rumipalItem.packs }
                  : existingItem
              );
            } else {
              return [...prevCart, rumipalItem];
            }
          });
        }
      });
      setRumipalConfigs([]);
    } else if (item.product.id === 10 || item.product.id === 11) {
      bigCConfigs
        .filter(config => config.productId === item.product.id)
        .forEach(config => {
          if (config.flavors.length > 0) {
            const bigCItem = {
              id: `bigc-${config.id}`,
              name: item.product.name,
              optionName: `Pack x1 (${config.flavors.join(', ')})`,
              packs: config.packs,
              quantity: config.productId === 10 ? config.packs * 18 : config.packs * 12,
              price: item.product.pricePerPack,
              totalPrice: config.packs * item.product.pricePerPack,
              flavors: config.flavors,
              productId: item.product.id
            };
            setCart(prevCart => {
              const existing = prevCart.find(existingItem => 
                existingItem.name === bigCItem.name && 
                JSON.stringify(existingItem.flavors) === JSON.stringify(bigCItem.flavors)
              );
              if (existing) {
                return prevCart.map(existingItem => 
                  existingItem.name === bigCItem.name && 
                  JSON.stringify(existingItem.flavors) === JSON.stringify(bigCItem.flavors)
                    ? { ...existingItem, quantity: existingItem.quantity + bigCItem.quantity, totalPrice: existingItem.totalPrice + bigCItem.totalPrice, packs: existingItem.packs + bigCItem.packs }
                    : existingItem
                );
              } else {
                return [...prevCart, bigCItem];
              }
            });
          }
        });
      setBigCConfigs(bigCConfigs.filter(config => config.productId !== item.product.id));
    } else {
      const cartItem = {
        id: `${item.product.id}-${item.option.id}`,
        productId: item.product.id,
        name: item.product.name,
        optionName: item.option.name,
        quantity: item.option.quantity,
        price: item.option.price,
        totalPrice: item.option.price
      };
      
      const existingItem = cart.find(existing => existing.id === cartItem.id);
      if (existingItem) {
        setCart(cart.map(existing => 
          existing.id === cartItem.id 
            ? { ...existing, quantity: existing.quantity + cartItem.quantity, totalPrice: existing.totalPrice + cartItem.totalPrice }
            : existing
        ));
      } else {
        setCart([...cart, cartItem]);
      }
    }
  };

  const removeFromCart = (cartItemId) => {
    setCart(cart.filter(item => item.id !== cartItemId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0);
  };

  const generateWhatsAppMessage = () => {
    const message = `¡Hola! Quisiera hacer un pedido desde DistriFisherton:\n\n` +
      cart.map(item => {
        if (item.isOffer) {
          return `• ${item.name}: ${item.quantity} unidad(es) - ${formatPrice(item.totalPrice)}`;
        } else if (item.flavors) {
          if (item.productId === 10) {
            const packDisplay = item.packs > 1 ? `Pack x18 x${item.packs}` : `Pack x18`;
            return `• ${item.name} (${packDisplay} - ${item.flavors.join(', ')}): ${item.quantity} unidades - ${formatPrice(item.totalPrice)}`;
          } else if (item.productId === 11) {
            const packDisplay = item.packs > 1 ? `Pack x12 x${item.packs}` : `Pack x12`;
            return `• ${item.name} (${packDisplay} - ${item.flavors.join(', ')}): ${item.quantity} unidades - ${formatPrice(item.totalPrice)}`;
          } else {
            const packDisplay = item.packs > 1 ? `Pack x6 x${item.packs}` : `Pack x6`;
            return `• ${item.name} (${packDisplay} - ${item.flavors.join(', ')}): ${item.quantity} unidades - ${formatPrice(item.totalPrice)}`;
          }
        } else {
          return `• ${item.name} (${item.optionName}): ${item.quantity} unidades - ${formatPrice(item.totalPrice)}`;
        }
      }).join('\n') +
      `\n\nTotal: ${formatPrice(calculateTotal())}\n\nGracias!`;
    
    return encodeURIComponent(message);
  };

  const sendOrder = () => {
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${generateWhatsAppMessage()}`;
    window.open(whatsappUrl, '_blank');
  };

  const getBigCConfigsByProduct = (productId) => {
    return bigCConfigs.filter(config => config.productId === productId);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-[#4CAF50]" />
              <h1 className="text-xl font-bold text-[#333333]">DistriFisherton</h1>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={scrollToProducts}
                className="text-[#333333] hover:text-[#4CAF50] transition-colors"
              >
                Productos
              </button>
            </nav>
            
            <div className="flex items-center space-x-4">
              <a href={CONFIG.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-[#333333] hover:text-[#4CAF50] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={CONFIG.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-[#333333] hover:text-[#4CAF50] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              
              <button 
                onClick={() => setShowCart(!showCart)}
                className="relative p-2 text-[#333333] hover:text-[#2196F3] transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FF9800] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {showCart && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowCart(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold text-[#333333]">Carrito de Compras</h2>
                <button 
                  onClick={() => setShowCart(false)}
                  className="text-[#333333] hover:text-[#FF9800]"
                >
                  ✕
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <p className="text-[#333333] text-center py-8">Tu carrito está vacío</p>
                ) : (
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-[#F9F9F9] rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-medium text-[#333333]">{item.name}</h3>
                          <p className="text-sm text-[#666666] mt-1">
                            {item.isOffer 
                              ? item.description
                              : `${item.optionName || item.flavors?.join(', ')} - ${item.quantity} unidades`}
                          </p>
                          <p className="font-semibold text-[#4CAF50] mt-2">
                            {formatPrice(item.totalPrice)}
                          </p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          Eliminar
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {cart.length > 0 && (
                <div className="border-t p-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[#333333] font-medium">Total:</span>
                    <span className="text-lg font-bold text-[#4CAF50]">{formatPrice(calculateTotal())}</span>
                  </div>
                  <button
                    onClick={sendOrder}
                
