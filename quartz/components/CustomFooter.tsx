import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const CustomFooter: QuartzComponent = ({ displayClass, fileData, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const staticLinks = opts?.links ?? {}

    // Base settings for your repository
    const repoUrl = "https://github.com/0penthe0ry/website"
    const branch = "main"

    // Fallback logic to avoid linking empty paths on the index page
    const fileRelativePath = fileData.filePath || ""
    const isIndex = fileData.slug === "index"

    // Generate our dynamic routes
    const editUrl = isIndex 
      ? repoUrl 
      : `${repoUrl}/edit/${branch}/${fileRelativePath}`
    
    const bugUrl = isIndex
      ? `${repoUrl}/issues/new/choose`
      : `${repoUrl}/issues/new?title=Bug+on+${encodeURIComponent(fileData.slug || "")}&body=Found+an+issue+on+the+page:+${repoUrl}/blob/${branch}/${fileRelativePath}`

    return (
      <footer className={`${displayClass ?? ""}`}>
        <p>
          © {year} Open Theory Group. Built with <a href="https://quartz.jzhao.xyz/">Quartz</a>.
        </p>
        <ul>
          {/* Render our static links first */}
          {Object.entries(staticLinks).map(([text, link]) => (
            <li key={text}>
              <a href={link} target="_blank" rel="noopener noreferrer">{text}</a>
            </li>
          ))}
          
          {/* Append our dynamic context links */}
          <li>
            <a href={bugUrl} target="_blank" rel="noopener noreferrer">Report Page Bug</a>
          </li>
          <li>
            <a href={editUrl} target="_blank" rel="noopener noreferrer">Edit Page Source</a>
          </li>
        </ul>
      </footer>
    )
  }

  CustomFooter.css = style
  return CustomFooter
}) satisfies QuartzComponentConstructor
