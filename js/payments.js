/**
 * AMABELLEPEAU — Payment Configuration (v5.0 Unified)
 * ====================================================
 * Payment gateway links and handlers for Wave, Orange Money, and WhatsApp.
 * Direct merchant QR/redirect links for Abidjan, Côte d'Ivoire.
 * Recipient phone: +225 07 99 10 81 08
 */

const PAYMENT_CONFIG = {
  /**
   * Wave Merchant Payment Link
   * Redirects customer to Wave app to complete payment
   */
  wave: {
    name: 'Wave CI',
    label: 'Payer avec Wave',
    description: 'Paiement sans frais instantané avec Wave',
    link: 'https://pay.wave.com/mqr-tc/mqr-1cz6t6hdg21tj',
    color: '#1E90FF',
    icon: '🌊',
    logo: 'WAVE',
  },

  /**
   * Orange Money Merchant Payment Link
   * Redirects customer to Orange Money to complete payment
   */
  orangeMoney: {
    name: 'Orange Money CI',
    label: 'Payer avec Orange Money',
    description: 'Paiement sécurisé via compte Orange Money',
    link: 'https://multi.app.orange-money.com/app/v1/kapptivate/qrcode/odyssee/?id=codgen51-68692f6d78d84349b91a11cc1bcaa701&v=1',
    color: '#FF6600',
    icon: '🟠',
    logo: 'OM',
  },

  /**
   * WhatsApp Business direct checkout
   */
  whatsapp: {
    name: 'WhatsApp Business',
    label: 'Commander & Valider via WhatsApp',
    description: 'Finalisez directement votre commande avec notre conseiller sur WhatsApp',
    link: 'https://wa.me/2250799108108',
    phone: '+2250799108108',
    color: '#25D366',
    icon: '💬',
    logo: 'WA',
  },
};

/**
 * Initiates payment with the selected provider.
 * Opens the payment link / WhatsApp in a new tab.
 * Shows the confirmation prompt modal for seamless order finalization.
 *
 * @param {string} method - 'wave' | 'orangeMoney' | 'whatsapp'
 * @param {Object} orderData - { orderNumber, total, items, customerName, phone, address, deliveryMethod }
 */
function initiatePayment(method, orderData) {
  const config = PAYMENT_CONFIG[method] || PAYMENT_CONFIG.whatsapp;

  // Save order to localStorage for confirmation and tracking
  try {
    localStorage.setItem('pendingOrder', JSON.stringify({
      ...orderData,
      paymentMethod: method,
      paymentLabel: config.name,
      status: 'pending_payment',
      createdAt: new Date().toISOString(),
    }));
  } catch (e) {}

  // For WhatsApp, build pre-filled message
  if (method === 'whatsapp') {
    const message = buildWhatsAppMessage(orderData);
    const whatsappLink = `https://wa.me/2250799108108?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  } else {
    // For Wave and Orange Money, open the merchant payment gateway link
    window.open(config.link, '_blank');
  }

  // Show the payment confirmation UI prompt
  showPaymentConfirmationPrompt(method, orderData);
}

/**
 * Builds a clean, professional WhatsApp order recap message.
 */
function buildWhatsAppMessage(orderData) {
  const items = (orderData.items || [])
    .map(item => `• ${item.name} (x${item.qty || item.quantity || 1}) — ${formatXOF(item.price * (item.qty || item.quantity || 1))}`)
    .join('\n');

  return `🌿 *COMMANDE AMABELLEPEAU* — Réf: ${orderData.orderNumber}
----------------------------------------
👤 *Client :* ${orderData.customerName || 'Client'}
📱 *Téléphone :* ${orderData.phone || 'Non renseigné'}
📍 *Adresse :* ${orderData.address || 'Abidjan'}
🚚 *Mode :* ${orderData.deliveryMethod || 'Livraison Abidjan'}
💳 *Paiement :* ${orderData.paymentLabel || 'WhatsApp / Mobile Money'}
----------------------------------------
📦 *DÉTAIL DU PANIER :*
${items}
----------------------------------------
💰 *TOTAL À PAYER :* ${formatXOF(orderData.total || 0)}
----------------------------------------
Merci de me confirmer la disponibilité et le créneau de livraison ! ✨`;
}

/**
 * Shows modal prompting user to confirm they've completed payment.
 */
function showPaymentConfirmationPrompt(method, orderData) {
  const config = PAYMENT_CONFIG[method] || PAYMENT_CONFIG.whatsapp;
  const modal = document.getElementById('payment-confirmation-modal');
  if (modal) {
    const nameEl = modal.querySelector('.payment-method-name');
    if (nameEl) nameEl.textContent = config.name;
    modal.classList.add('active');
  }
}

/**
 * Formats a number as XOF currency string.
 * e.g. 3500 → "3 500 XOF"
 */
function formatXOF(amount) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(amount) + ' XOF';
}

/**
 * Generates a unique order number.
 */
function generateOrderNumber() {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ABP-${ts}${rand}`;
}

// Export for window and module use
if (typeof window !== 'undefined') {
  window.PAYMENT_CONFIG = PAYMENT_CONFIG;
  window.initiatePayment = initiatePayment;
  window.buildWhatsAppMessage = buildWhatsAppMessage;
  window.formatXOF = formatXOF;
  window.generateOrderNumber = generateOrderNumber;
}

if (typeof module !== 'undefined') {
  module.exports = { PAYMENT_CONFIG, initiatePayment, buildWhatsAppMessage, formatXOF, generateOrderNumber };
}
