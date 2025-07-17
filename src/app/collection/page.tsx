import { Suspense } from 'react';
import CollectionClient from './CollectionClient';

export default function CollectionPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading collection...</div>}>
      <CollectionClient />
    </Suspense>
  );
}