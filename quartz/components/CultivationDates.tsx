import { classNames } from "../util/lang"
import { getDate } from "./Date"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function CultivationDates({ fileData, displayClass, cfg }: QuartzComponentProps) {
    
    function daysAgoFormat(date: Date, locale?: string): string {
        const currentDate = new Date();
        const diffInDays = Math.floor((currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
        const formatter = new Intl.RelativeTimeFormat(locale ?? "en-US", { numeric: "auto" });
        return formatter.format(-diffInDays, "day");
    }

    const { githubUsername, gitHubFrontPorchRepoName } = cfg;
    const { relativePath } = fileData;

    const updatedDateStr = daysAgoFormat(getDate(cfg, fileData)!, cfg.locale);

    const publishedDate = fileData.dates?.published;

    let publishedDateStr;

    if (publishedDate !== undefined) {
        publishedDateStr = daysAgoFormat(publishedDate, cfg.locale)
    }
    
    if (publishedDateStr && updatedDateStr) {
        return (
            <div class={classNames(displayClass, "cultivation-dates")}>
                <p><span>Published:</span> {publishedDateStr}</p>
                <p><span>Last Tended:</span> {updatedDateStr} (<a target="_blank" href={`https://github.com/${githubUsername}/${gitHubFrontPorchRepoName}/commits/main/content/${relativePath}`}>View History</a>)</p>
            </div>
        )
    } else {
        return null
    }
}

CultivationDates.css = `
.cultivation-dates {
    margin: 0;
    padding: 0;

    p {
        color: var(--darkgray);
        margin: 0;
        line-height: 1rem;
        font-size: 0.8rem;
    }
}
`

export default (() => CultivationDates) satisfies QuartzComponentConstructor