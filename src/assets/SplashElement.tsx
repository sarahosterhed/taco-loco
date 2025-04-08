type ClassNameProps = {
    className: string;
}

export const SplashElement = ({ className }: ClassNameProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 27" className={className} fill="currentColor">
            <path
                d="M20.02,13.67c-1.12-1.66-8.34-5.24-11.94-5.23-3.61.01-7.48,1.41-8.03,4.19-.55,2.78,3.35,4.98,6.95,4.97,3.61-.01,12.19-3.37,13.02-3.93Z" />
            <path
                d="M21.18,11.8c.48-1.22-.59-6.58-2.18-8.61C17.42,1.16,14.91-.53,13.06.15s-1.44,3.67.15,5.7c1.58,2.03,7.29,5.68,7.98,5.95Z" />
            <path
                d="M21.68,15.66c.34,1.27-1.34,6.47-3.14,8.3-1.8,1.84-4.49,3.23-6.25,2.34s-1.01-3.81.79-5.64,7.89-4.81,8.6-5Z" />
        </svg>
    )
}
