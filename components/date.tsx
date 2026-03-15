import { parseISO, format } from 'date-fns';

type Props = {
    dateString: string;
}

export default function Date({ dateString }: Props) {
    const date = parseISO(dateString);
    return <time className='tabular-nums' dateTime={dateString}>{format(date, 'yyyy-MM-dd')}</time>;
}
