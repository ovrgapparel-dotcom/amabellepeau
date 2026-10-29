/**
 * AMABELLEPEAU — Payment Configuration
 * =====================================
 * Payment gateway links and handlers for Wave, Orange Money, and WhatsApp.
 * These are static merchant QR/redirect links for MVP phase.
 * Future: Replace with full API integration once provider credentials are obtained.
 */

const PAYMENT_CONFIG = {
  /**
   * Wave Merchant Payment Link
   * Redirects customer to Wave app to complete payment
   */
  wave: {
    name: 'Wave',
    label: 'Payer avec Wave',
    description: 'Rapide et sécurisé avec Wave',
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
    name: 'Orange Money',
    label: 'Payer avec Orange Money',
    description: 'Paiement sécurisé Orange Money',
    link: 'https://multi.app.orange-money.com/app/v1/kapptivate/qrcode/odyssee/?id=codgen51-68692f6d78d84349b91a11cc1bcaa701&v=1',
    color: '#FF6600',
    icon: '🟠',
    logo: 'OM',
  },

  /**
   * WhatsApp Catalog / Order via WhatsApp
   * For direct orders through WhatsApp Business catalog
   */
  whatsapp: {
    name: 'WhatsApp',
    label: 'Commander via WhatsApp',
    description: 'Passez votre commande directement sur WhatsApp',
    link: 'https://wa.me/c/2250799108108',
    phone: '+2250799108108',
    color: '#25D366',
    icon: '💬',
    logo: 'WA',
  },
};

/**
 * Initiates payment with the selected provider.
 * Opens the payment link in a new tab/window.
 * After payment, the user returns to the confirmation page.
 *
 * @param {string} method - 'wave' | 'orangeMoney' | 'whatsapp'
 * @param {Object} orderData - { orderNumber, total, items }
 */
function initiatePayment(method, orderData) {
  const config = PAYMENT_CONFIG[method];
  if (!config) {
    console.error('Méthode de paiement inconnue:', method);
    return;
  }

  // Save order to localStorage for confirmation page
  localStorage.setItem('pendingOrder', JSON.stringify({
    ...orderData,
    paymentMethod: method,
    paymentLabel: config.name,
    status: 'pending_payment',
    createdAt: new Date().toISOString(),
  }));

  // For WhatsApp, build a pre-filled message with order details
  if (method === 'whatsapp') {
    const message = buildWhatsAppMessage(orderData);
    const whatsappLink = `https://wa.me/2250799108108?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
    return;
  }

  // For Wave and Orange Money, open the payment link
  window.open(config.link, '_blank');

  // Show the "I have paid" confirmation UI
  showPaymentConfirmationPrompt(method, orderData);
}

/**
 * Builds a pre-filled WhatsApp message for ordering.
 */
function buildWhatsAppMessage(orderData) {
  const items = orderData.items
    .map(item => `• ${item.name} x${item.qty} — ${formatXOF(item.price * item.qty)}`)
    .join('\n');

  return `Bonjour AMABELLEPEAU ! 🌿\n\nJe souhaite passer une commande :\n\n${items}\n\nTotal: ${formatXOF(orderData.total)}\n\nNom: ${orderData.customerName}\nAdresse: ${orderData.address}\nTéléphone: ${orderData.phone}\n\nMerci ! 😊`;
}

/**
 * Shows a modal prompting user to confirm they've completed payment.
 */
function showPaymentConfirmationPrompt(method, orderData) {
  const config = PAYMENT_CONFIG[method];
  const modal = document.getElementById('payment-confirmation-modal');
  if (modal) {
    modal.querySelector('.payment-method-name').textContent = config.name;
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

// Export for module use
if (typeof module !== 'undefined') {
  module.exports = { PAYMENT_CONFIG, initiatePayment, formatXOF, generateOrderNumber };
}
