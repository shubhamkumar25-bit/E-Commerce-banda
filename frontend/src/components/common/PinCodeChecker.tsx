import React, { useState } from 'react';
import { MapPin, CheckCircle2, Truck, Clock } from 'lucide-react';

export const PinCodeChecker: React.FC = () => {
  const [pinCode, setPinCode] = useState('');
  const [status, setStatus] = useState<{ checked: boolean; valid: boolean; message: string; days?: string } | null>(null);

  const checkPinCode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pinCode.trim();
    if (!/^\d{6}$/.test(cleanPin)) {
      setStatus({
        checked: true,
        valid: false,
        message: 'Please enter a valid 6-digit Indian PIN Code'
      });
      return;
    }

    // Check delivery eligibility (All 6 digit Indian PIN codes serviceable from Banda hub)
    const isUP = cleanPin.startsWith('2');
    const deliveryDays = isUP ? '2-3 Business Days' : '4-5 Business Days';

    setStatus({
      checked: true,
      valid: true,
      message: `Standard Delivery Available to PIN ${cleanPin}`,
      days: deliveryDays
    });
  };

  return (
    <div className="bg-cream-light/80 p-4 rounded-xl border border-cream-dark">
      <div className="flex items-center gap-2 mb-2 text-xs font-bold text-forest uppercase tracking-wider">
        <MapPin className="w-4 h-4 text-gold" /> Check Delivery to Your Location
      </div>

      <form onSubmit={checkPinCode} className="flex gap-2">
        <input
          type="text"
          maxLength={6}
          value={pinCode}
          onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ''))}
          placeholder="Enter 6-digit PIN Code (e.g. 210001)"
          className="flex-1 px-3.5 py-2 text-xs bg-white rounded-lg border border-cream-dark focus:outline-none focus:border-gold"
        />
        <button
          type="submit"
          className="bg-forest hover:bg-forest-dark text-cream text-xs font-bold px-4 py-2 rounded-lg transition"
        >
          Check
        </button>
      </form>

      {status?.checked && (
        <div className={`mt-3 text-xs p-2.5 rounded-lg flex items-start gap-2 ${
          status.valid ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {status.valid ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">{status.message}</p>
                <div className="flex items-center gap-4 mt-1 text-[11px] text-emerald-700">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Est. Delivery: {status.days}
                  </span>
                  <span className="flex items-center gap-1">
                    <Truck className="w-3 h-3" /> COD Available
                  </span>
                </div>
              </div>
            </>
          ) : (
            <p className="font-semibold">{status.message}</p>
          )}
        </div>
      )}
    </div>
  );
};

