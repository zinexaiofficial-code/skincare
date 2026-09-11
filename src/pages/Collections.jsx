import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { CollectionCard } from '../components/common/CollectionCard';
import { PageHero } from '../components/common/PageHero';
import { collections } from '../data/site';

export default function Collections() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const visible = useMemo(
    () =>
      collections
        .filter((c) => Boolean(c.image))
        .filter(
          (c) =>
            (filter === 'all' || c.theme === filter) &&
            `${c.name} ${c.description} ${c.eyebrow}`.toLowerCase().includes(query.toLowerCase())
        ),
    [query, filter]
  );

  return (
    <main>
      <PageHero
        eyebrow="The Sashwari edit"
        title="Find your everyday ritual."
        description="Explore considered skincare collections created around different skin concerns, moments and routines."
        current="Collections"
      />
      <section className="section">
        <div className="container">
          <div className="catalogue-tools">
            <label className="search-field">
              <Search size={18} />
              <span className="sr-only">Search collections</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search collections"
              />
            </label>
            <div className="filter-tabs" aria-label="Filter collections">
              {[
                ['all', 'All ranges'],
                ['sky', 'Radiance'],
                ['blush', 'Hair care'],
                ['champagne', '24K Gold'],
                ['emerald', 'Pimple care'],
              ].map(([value, label]) => (
                <button
                  className={filter === value ? 'active' : ''}
                  onClick={() => setFilter(value)}
                  key={value}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="collection-grid catalog-grid">
            {visible.map((c) => (
              <CollectionCard collection={c} key={c.slug} />
            ))}
          </div>
          {!visible.length && (
            <div className="empty-state">
              <h3>No collection found</h3>
              <p>Try a different search or speak with us for personal guidance.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

