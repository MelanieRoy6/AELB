import { Component, OnInit, signal } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { FacebookPost } from '../../core/models';

@Component({
  selector: 'app-evenements',
  standalone: true,
  imports: [],
  template: `
    <div class="evenements-page">

      <!-- Hero -->
      <section class="events-hero">
        <div class="hero-content">
          <span class="hero-badge">Facebook & Actualités</span>
          <h1>Évènements & Actualités</h1>
          <p>Toutes les nouvelles de l'AELB en un seul endroit</p>
        </div>
      </section>

      <!-- Contenu principal -->
      <div class="page-container">
        <div class="layout-grid">

          <!-- Sidebar -->
          <aside class="sidebar">

            <div class="sidebar-card highlight-card">
              <img src="/ICON/FollowUs.svg" alt="" aria-hidden="true" class="card-icon">
              <h3>Suivez-nous !</h3>
              <p>Rejoignez notre communauté sur Facebook pour être les premiers informés de nos événements, spectacles et activités associatives à Brains.</p>
              <a href="https://www.facebook.com/aelbrains/" target="_blank" rel="noopener" class="app-button app-button-primary full-width">
                Voir notre page Facebook
              </a>
            </div>

            <div class="sidebar-card">
              <img src="/ICON/Calendar.svg" alt="" aria-hidden="true" class="card-icon">
              <h3>Réserver la salle</h3>
              <p>Vous organisez un événement ? Profitez de notre salle bien équipée au cœur de Brains.</p>
              <a href="/reservation" class="app-button app-button-accent full-width">Faire une demande</a>
            </div>

            <div class="sidebar-card">
              <img src="/ICON/Question.svg" alt="" aria-hidden="true" class="card-icon">
              <h3>Une question ?</h3>
              <p>Contactez-nous pour proposer un événement ou obtenir des informations sur nos activités.</p>
              <a href="mailto:contact@aelb-brains.fr" class="app-button app-button-secondary full-width">Nous écrire</a>
            </div>

          </aside>

          <!-- Posts Facebook -->
          <main class="feed-main">

            <div class="feed-header">
              <div class="feed-title-row">
                <h2>Derniers posts</h2>
                <a href="https://www.facebook.com/aelbrains/" target="_blank" rel="noopener" class="fb-page-link">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1877F2" width="18" height="18" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  AELB – Brains
                </a>
              </div>
              <p class="feed-subtitle">Les 3 derniers posts publiés sur notre page Facebook</p>
            </div>

            <!-- Squelettes de chargement -->
            @if (loading()) {
              <div class="posts-grid">
                @for (s of [1,2,3]; track s) {
                  <div class="post-card post-card--skeleton">
                    <div class="skeleton skeleton-img"></div>
                    <div class="post-card-body">
                      <div class="skeleton skeleton-line skeleton-line--short"></div>
                      <div class="skeleton skeleton-line"></div>
                      <div class="skeleton skeleton-line"></div>
                      <div class="skeleton skeleton-line skeleton-line--medium"></div>
                    </div>
                  </div>
                }
              </div>
            }

            <!-- Posts chargés -->
            @if (!loading() && posts().length > 0) {
              <div class="posts-grid">
                @for (post of posts(); track post.id) {
                  <article class="post-card">
                    @if (post.fullPicture) {
                      <div class="post-card-img">
                        <img [src]="post.fullPicture" [alt]="'Post Facebook du ' + formatDate(post.createdTime)" loading="lazy">
                      </div>
                    } @else {
                      <div class="post-card-img post-card-img--placeholder" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1877F2" width="40" height="40">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </div>
                    }
                    <div class="post-card-body">
                      <div class="post-meta">
                        <div class="post-author">
                          <div class="post-author-avatar" aria-hidden="true">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1877F2" width="14" height="14">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                          </div>
                          <span class="post-author-name">AELB – Brains</span>
                        </div>
                        <time class="post-date" [dateTime]="post.createdTime">{{ formatDate(post.createdTime) }}</time>
                      </div>
                      <p class="post-message">{{ truncate(post.message) }}</p>
                      <a [href]="post.permalinkUrl" target="_blank" rel="noopener" class="post-link">
                        Lire la suite
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="14" height="14" aria-hidden="true">
                          <path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clip-rule="evenodd"/>
                        </svg>
                      </a>
                    </div>
                  </article>
                }
              </div>
            }

            <!-- Fallback : token non configuré ou erreur -->
            @if (!loading() && posts().length === 0) {
              <div class="feed-fallback">
                <div class="fb-icon-wrap" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1877F2" width="40" height="40">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <h3>Retrouvez-nous sur Facebook</h3>
                <p>Suivez notre page pour découvrir toutes nos actualités, événements et nouveautés.</p>
                <a href="https://www.facebook.com/aelbrains/" target="_blank" rel="noopener" class="app-button app-button-primary">
                  Voir notre page Facebook
                </a>
              </div>
            }

          </main>

        </div>
      </div>
    </div>
  `,
  styles: [`
    /* === Hero === */
    .events-hero {
      background:
        linear-gradient(155deg, rgba(30, 61, 47, 0.82) 0%, rgba(45, 106, 79, 0.44) 100%),
        url('/salle-hero.png') center / cover no-repeat;
      height: 320px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .hero-content { max-width: 600px; padding: 0 24px; }

    .hero-badge {
      display: inline-block;
      background: rgba(255, 255, 255, 0.18);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.35);
      color: white;
      padding: 5px 18px;
      border-radius: 50px;
      font-size: 0.78rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 18px;
    }

    .hero-content h1 {
      font-size: 2.6rem;
      font-weight: 800;
      color: white;
      margin-bottom: 12px;
      text-shadow: 0 2px 12px rgba(0, 0, 0, 0.25);
    }

    .hero-content p { font-size: 1.05rem; color: rgba(255, 255, 255, 0.88); margin: 0; }

    /* === Mise en page === */
    .page-container { max-width: 1200px; margin: 0 auto; padding: 60px 24px 80px; }

    .layout-grid {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 36px;
      align-items: start;
    }

    /* === Sidebar === */
    .sidebar {
      display: flex;
      flex-direction: column;
      gap: 18px;
      position: sticky;
      top: 90px;
    }

    .sidebar-card {
      background: white;
      border-radius: 20px;
      padding: 26px 22px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
      border: 1px solid rgba(0, 0, 0, 0.04);
      text-align: center;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
    }

    .sidebar-card:hover { transform: translateY(-4px); box-shadow: 0 12px 28px rgba(0, 0, 0, 0.09); }

    .highlight-card {
      background: linear-gradient(135deg, var(--g050, #edf5ee) 0%, #f0faf3 100%);
      border-color: var(--g100, #c8ebd4);
    }

    .card-icon { width: 48px; height: 48px; display: block; margin: 0 auto 14px; }

    .sidebar-card h3 { font-size: 1rem; font-weight: 700; color: var(--g900, #1e3d2f); margin-bottom: 8px; }
    .sidebar-card p { color: var(--text-muted, #556b5a); font-size: 0.85rem; line-height: 1.55; margin-bottom: 18px; }

    .full-width { width: 100%; box-sizing: border-box; }

    /* === Header flux === */
    .feed-header { margin-bottom: 28px; }

    .feed-title-row {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 6px;
    }

    .feed-title-row h2 { font-size: 1.5rem; font-weight: 800; color: var(--g900, #1e3d2f); margin: 0; }

    .fb-page-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.85rem;
      font-weight: 600;
      color: #1877F2;
      text-decoration: none;
      background: #e7f0fe;
      padding: 4px 12px;
      border-radius: 50px;
      transition: background 0.2s;
    }

    .fb-page-link:hover { background: #d0e4fd; }

    .feed-subtitle { color: var(--text-muted, #556b5a); font-size: 0.9rem; margin: 0; }

    /* === Grille de posts === */
    .posts-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }

    /* === Carte de post === */
    .post-card {
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
      border: 1px solid rgba(0, 0, 0, 0.05);
      display: flex;
      flex-direction: column;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }

    .post-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(30, 61, 47, 0.12);
    }

    /* Image du post */
    .post-card-img {
      width: 100%;
      aspect-ratio: 16 / 9;
      overflow: hidden;
      background: var(--g050, #edf5ee);
    }

    .post-card-img img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.35s ease;
    }

    .post-card:hover .post-card-img img { transform: scale(1.04); }

    .post-card-img--placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Corps de la carte */
    .post-card-body {
      padding: 18px 20px 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex: 1;
    }

    .post-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .post-author {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .post-author-avatar {
      width: 24px;
      height: 24px;
      background: #e7f0fe;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .post-author-name {
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--g900, #1e3d2f);
    }

    .post-date {
      font-size: 0.75rem;
      color: var(--text-muted, #556b5a);
      white-space: nowrap;
    }

    .post-message {
      font-size: 0.88rem;
      color: var(--text-muted, #445a4e);
      line-height: 1.6;
      margin: 0;
      flex: 1;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .post-link {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--g800, #2d6a4f);
      text-decoration: none;
      margin-top: auto;
      align-self: flex-start;
    }

    .post-link:hover { color: var(--g900, #1e3d2f); text-decoration: underline; }

    /* === Squelettes === */
    .post-card--skeleton { pointer-events: none; }

    .skeleton {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: shimmer 1.4s infinite;
      border-radius: 6px;
    }

    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    .skeleton-img { width: 100%; aspect-ratio: 16 / 9; border-radius: 0; }
    .skeleton-line { height: 12px; margin: 4px 0; }
    .skeleton-line--short { width: 45%; }
    .skeleton-line--medium { width: 65%; }

    /* === Fallback === */
    .feed-fallback {
      background: white;
      border-radius: 24px;
      padding: 60px 40px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      border: 1px solid rgba(0, 0, 0, 0.04);
    }

    .fb-icon-wrap {
      width: 72px;
      height: 72px;
      background: #e7f0fe;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 8px;
    }

    .feed-fallback h3 { font-size: 1.2rem; font-weight: 700; color: var(--g900, #1e3d2f); margin: 0; }
    .feed-fallback p { color: var(--text-muted, #556b5a); font-size: 0.95rem; max-width: 340px; margin: 0 0 8px; line-height: 1.6; }

    /* === Responsive === */
    @media (max-width: 1100px) {
      .posts-grid { grid-template-columns: repeat(2, 1fr); }
    }

    @media (max-width: 900px) {
      .layout-grid { grid-template-columns: 1fr; }
      .sidebar { position: static; flex-direction: row; flex-wrap: wrap; }
      .sidebar-card { flex: 1; min-width: 220px; }
      .feed-main { order: -1; }
    }

    @media (max-width: 640px) {
      .posts-grid { grid-template-columns: 1fr; }
      .events-hero { height: 260px; }
      .hero-content h1 { font-size: 1.9rem; }
      .sidebar { flex-direction: column; }
    }
  `]
})
export class EvenementsComponent implements OnInit {
  posts = signal<FacebookPost[]>([]);
  loading = signal(true);

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getFacebookPosts(3).subscribe(data => {
      this.posts.set(data);
      this.loading.set(false);
    });
  }

  formatDate(isoDate: string): string {
    if (!isoDate) return '';
    return new Date(isoDate).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  truncate(text: string, max = 220): string {
    if (!text || text.length <= max) return text;
    return text.slice(0, text.lastIndexOf(' ', max)) + '…';
  }
}
