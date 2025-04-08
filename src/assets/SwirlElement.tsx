type ClassNameProps = {
    className: string;
}

export const SwirlElement = ({ className }: ClassNameProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 69.4 29.33" className={className} fill="currentColor">
            <path
                d="M0,28.64c0,1.3,12.05.63,30-1,11-1,22.32-4.38,28-7,13-6,13-14,9.2-17.58-3.98-3.74-11.2-4.42-14.49,0-4.83,6.49,4.42,11,4.36,6.15-.07-5.58,6.72-5.58,6.84-.54.09,3.96-6.91,9.96-21.91,13.96C34.03,24.77,0,28.04,0,28.64Z" />
        </svg>
    )
}
