import { useEffect, useRef, useState } from 'react';
import { Calendar } from 'react-date-range';
import format from 'date-fns/format';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const CalendarComponent = ({ value, onChange }) => {
  const [calendar, setCalendar] = useState(value ? format(value, 'dd/MM/yyyy') : '');
  const [open, setOpen] = useState(false);
  const refOne = useRef(null);

  useEffect(() => {
    // Set nilai awal jika tidak ada nilai `value`
    if (!value) {
      const today = new Date();
      setCalendar(format(today, 'dd/MM/yyyy'));
      onChange && onChange(today);
    }
    // Event listener untuk menutup kalender saat klik di luar
    document.addEventListener('click', hideOnClickOutside, true);
    return () => document.removeEventListener('click', hideOnClickOutside, true);
  }, [value, onChange]);

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const handleSelect = (date) => {
    setCalendar(format(date, 'dd/MM/yyyy'));
    onChange && onChange(date); // Memanggil `onChange` saat tanggal berubah
  };

  return (
    <div className="calendarWrap">
      <input
        value={calendar}
        readOnly
        className="inputBox"
        onClick={() => setOpen((open) => !open)}
      />
      <div ref={refOne}>
        {open && (
          <Calendar
            date={value || new Date()}
            onChange={handleSelect}
            className="calendarElement"
          />
        )}
      </div>
    </div>
  );
};

export default CalendarComponent;
