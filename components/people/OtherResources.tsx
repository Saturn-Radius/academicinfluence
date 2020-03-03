import { GRAY_LIGHT, PRIMARY_DARK } from "../../styles"
import ContentCard from "../ContentCard"

interface ResourceData {
    links: string[];
}

const OtherResources = (props: ResourceData) => {
    const getHostName = (url: any) => {
        let match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
        if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
            return match[2];
        } else {
            return null;
        }
    }

    const getDomain = (url: any) => {
        var hostName = getHostName(url);
        var domain = hostName;

        if(hostName != null) {
            var parts = hostName.split('.').reverse();

            if (parts != null && parts.length > 1) {
                domain = parts[1] + '.' + parts[0];
                if (domain == "wikipedia.org") {
                  domain = "Wikipedia.com";
                }
            }
        }

        return domain;
    }

    return (
        <div style={{ display: 'inline-block', maxWidth:"100vw", minWidth:320, marginRight:40}}>
            <h4 style={styles.subheaderText}>Other resources</h4>
            <ContentCard style={styles.container}>
                <div>
                {
                    props.links.map((resource, i) =>
                    <div key={i}>
                        <a href={resource} style={styles.link}>{getDomain(resource)}</a>
                    </div>)
                }
                </div>
            </ContentCard>
        </div>
    )
}

const styles = {
    subheaderText: {
        color: PRIMARY_DARK,
        fontSize: 22,
        marginTop: 10,
        marginBottom: 10
    },
    container: {
        fontSize: 18,
        lineHeight: 1.78,
        height:234,
        padding:20,
        color: GRAY_LIGHT,
        listStyleType: "none",
        fontFamily: 'SF UI Display Bold',
    },
    link: {
        fontSize: 18,
        lineHeight: 1.78,
        height:234,
        textDecoration: "none",
        color: GRAY_LIGHT,
        listStyleType: "none",
        fontFamily: 'SF UI Display Bold',
    }
}

export default OtherResources