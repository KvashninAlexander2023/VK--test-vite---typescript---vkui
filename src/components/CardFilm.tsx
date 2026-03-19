import { Box, Card, Image, Text, Title } from "@vkontakte/vkui";
import type { PoiskkinoDoc } from "../common/api/poiskkino.types";
import { Earpiece } from "./Earpiece";


export default function CardFilm(doc: PoiskkinoDoc) {

  const getTitle = (doc: PoiskkinoDoc) =>
    doc.name ?? doc.alternativeName ?? doc.names?.[0]?.name ?? 'Без названия';

  const getYear = (doc: PoiskkinoDoc) => doc.year ?? doc.releaseYears?.[0]?.start;

  const getRating = (doc: PoiskkinoDoc) => {
    const kp = doc.rating?.kp ?? 0;
    const imdb = doc.rating?.imdb ?? 0;
    const value = kp > 0 ? kp : imdb;
    return value > 0 ? value : null;
  };


  const year = getYear(doc);
  const rating = getRating(doc);
  const captionParts = [year ? String(year) : null, rating ? `Рейтинг: ${rating}` : 'Рейтинг:   -- '].filter(
    Boolean
  ) as string[];


  return (
    <div key={doc.id} style={{ flex: '1 1 260px', minWidth: 260, maxWidth: 320 }}>
      <Card mode='outline'
      >
        {doc.poster?.previewUrl || doc.poster?.url ? (
          <Image 
            src={doc.poster?.previewUrl ?? doc.poster?.url}
            alt={getTitle(doc)}
            style={{
              width: '100%',
              height: 360,
              objectFit: 'cover',
              display: 'block',
              background: 'var(--vkui--color_background_secondary)',
            }}
            loading="lazy"
          />
        ) : (
          <Earpiece height={360} />
        )}
        <Box style={{ padding: 16 }}>
          <Title level="3" Component="h3">
            {getTitle(doc)}
          </Title>
          {captionParts.length > 0 ? (
            <Text style={{ marginTop: 4 }}>{captionParts.join(' · ')}</Text>
          ) : null}
        </Box>
      </Card>
    </div>
  );
}