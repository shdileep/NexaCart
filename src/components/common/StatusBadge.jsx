import React from 'react';

/**
 * Reusable Status Badge Component
 */
export const StatusBadge = ({ status }) => {
  const normalized = (status || '').toLowerCase();

  const statusConfig = {
    approved: { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', label: 'Approved' },
    pending: { bg: 'bg-amber-50 text-amber-700 border-amber-200', label: 'Pending Approval' },
    rejected: { bg: 'bg-rose-50 text-rose-700 border-rose-200', label: 'Rejected' },
    placed: { bg: 'bg-blue-50 text-blue-700 border-blue-200', label: 'Order Placed' },
    processing: { bg: 'bg-purple-50 text-purple-700 border-purple-200', label: 'Processing' },
    shipped: { bg: 'bg-indigo-50 text-indigo-700 border-indigo-200', label: 'Shipped' },
    delivered: { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', label: 'Delivered' },
    cancelled: { bg: 'bg-slate-100 text-slate-600 border-slate-200', label: 'Cancelled' },
  };

  const config = statusConfig[normalized] || {
    bg: 'bg-slate-100 text-slate-600 border-slate-200',
    label: status,
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config.bg}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;
