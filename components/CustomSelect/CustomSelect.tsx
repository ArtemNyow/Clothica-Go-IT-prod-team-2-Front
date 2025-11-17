'use client';

import { useState, useRef, useEffect } from 'react';
import css from './CustomSelect.module.css';

interface Props {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export default function CustomSelect({
  value,
  options,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const toggleOpen = () => setOpen(prev => !prev);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () =>
      document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className={css.customSelectWrapper} ref={ref}>
      <button
        type="button"
        className={`${css.customSelectTrigger} ${open ? css.open : ''}`}
        onClick={toggleOpen}
      >
        {value || 'Оберіть розмір'}
        <svg className={css.selectArrow}>
          <use href="/sprite.svg#icon-arrow-bottom" />
        </svg>
      </button>

      {open && (
        <ul className={css.customSelectDropdown}>
          {options.map(opt => (
            <li
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={css.customSelectOption}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
