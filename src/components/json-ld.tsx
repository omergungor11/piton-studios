/**
 * JSON-LD yapilandirilmis veriyi <script type="application/ld+json"> olarak basar.
 * Server Component — istemciye JS gitmez.
 */
export default function JsonLd({
  data,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any> | (Record<string, any> | null)[];
}) {
  const items = (Array.isArray(data) ? data : [data]).filter(Boolean);
  if (!items.length) return null;

  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // JSON.stringify cikti kontrollu; XSS icin < karakteri kacislanir.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, '\\u003c'),
          }}
        />
      ))}
    </>
  );
}
