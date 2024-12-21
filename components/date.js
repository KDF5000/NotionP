import { parseISO, format } from 'date-fns';

export default function Date({ dateString }) {
    const date = parseISO(dateString);
    return <time className='tabular-nums' dateTime={dateString}>{format(date, 'yyyy-MM-dd')}</time>;
}