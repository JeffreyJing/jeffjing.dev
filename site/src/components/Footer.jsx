export default function Footer() {
  return (
    <footer className="w-full bg-black text-white py-10 px-6 text-center">
      <div className="flex justify-center gap-10 mb-4">
        <a href="https://github.com/JeffreyJing" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <svg className="w-6 h-6 fill-current hover:text-gray-400" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.373 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.729.082-.729 1.204.084 1.837 1.237 1.837 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.42-1.305.763-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.624-5.475 5.92.43.37.823 1.102.823 2.222v3.293c0 .32.218.694.825.576C20.565 21.796 24 17.297 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
        </a>

        <a href="https://linkedin.com/in/jeffrey-jing97" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg className="w-6 h-6 fill-current hover:text-gray-400" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 11.268h-3v-5.604c0-1.337-.027-3.062-1.866-3.062-1.868 0-2.154 1.46-2.154 2.967v5.699h-3v-10h2.882v1.367h.041c.401-.76 1.379-1.563 2.837-1.563 3.033 0 3.595 1.997 3.595 4.593v5.603z"/>
          </svg>
        </a>

        <a href="mailto:jjingdn@gmail.com" aria-label="Email">
          <svg className="w-6 h-6 fill-current hover:text-gray-400" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 1.99 2H20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </a>

        {/* Placeholder for Medium */}
        {/* <a href="https://medium.com/@yourname" target="_blank" rel="noopener noreferrer" aria-label="Medium">
          <svg>...</svg>
        </a> */}
      </div>

      <p className="text-sm">&copy; {new Date().getFullYear()} Jeffrey Jing. All rights reserved.</p>
    </footer>
  );
}
