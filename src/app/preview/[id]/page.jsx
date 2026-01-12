import WebsitePreview from '@/components/WebsitePreview'

export default function PreviewPage({ params }) {
  return <WebsitePreview websiteId={params.id} />
}