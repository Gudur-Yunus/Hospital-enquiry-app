import React from 'react';
import { t } from '../../data/translations';

// 3-step visual progress bar: Received → In Progress → Resolved
export default function ProgressBar({ status, lang }) {
  const steps = [
    { key: 'received', label: t(lang, 'statusReceived') },
    { key: 'in_progress', label: t(lang, 'statusInProgress') },
    { key: 'resolved', label: t(lang, 'statusResolved') },
  ];

  const statusIndex = {
    received: 0,
    in_progress: 1,
    resolved: 2,
  };

  const current = statusIndex[status] ?? 0;

  return (
    <div className="flex items-start gap-2 w-full mt-4">
      {steps.map((step, i) => {
        const isDone = i < current;
        const isActive = i === current;
        const isPending = i > current;

        return (
          <React.Fragment key={step.key}>
            <div className="flex flex-col items-center flex-1 min-w-0">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  isDone
                    ? 'step-done'
                    : isActive
                    ? 'step-active ring-4 ring-blue-100'
                    : 'step-pending'
                }`}
              >
                {isDone ? '✓' : i + 1}
              </div>
              <span
                className={`text-xs text-center mt-1 font-medium leading-tight break-words ${
                  isDone
                    ? 'text-teal-600'
                    : isActive
                    ? 'text-blue-700'
                    : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`h-1 flex-1 mt-5 rounded-full transition-all duration-500 ${
                  i < current ? 'bg-teal-400' : 'bg-slate-200'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
