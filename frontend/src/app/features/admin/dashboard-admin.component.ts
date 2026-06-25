import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataService } from '../../core/services/data.service';

const STORAGE_POSTITS = 'aelb_postits';
const STORAGE_ADHERENTS = 'aelb_adherents_last_update';

interface PostIt {
  id: string;
  text: string;
  color: 'yellow' | 'green' | 'blue' | 'pink';
  createdAt: string;
}

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="dash-header">
      <div>
        <h2>Tableau de bord</h2>
        <p class="dash-date">{{ todayLabel }}</p>
      </div>
      <img src="/LOGO/logo_website%28sans%20contour%29.png" alt="Logo AELB" class="dash-logo">
    </div>

    <!-- Notification demandes en attente -->
    @if (demandesEnAttente > 0) {
      <div class="notif-banner">
        <div class="notif-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"
            width="22" height="22">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </div>
        <div class="notif-content">
          <strong>
            {{ demandesEnAttente }} demande{{ demandesEnAttente > 1 ? 's' : '' }}
            de réservation en attente
          </strong>
          <span>{{ demandesEnAttente > 1 ? 'Ces demandes nécessitent votre attention.' : 'Cette demande nécessite votre attention.' }}</span>
        </div>
        <a routerLink="/admin/demandes" class="notif-btn">
          Traiter {{ demandesEnAttente > 1 ? 'les demandes' : 'la demande' }}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
            width="14" height="14">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </a>
      </div>
    }

    <!-- Ligne 1 : Prochaine résa + Rappel adhérents -->
    <div class="widgets-row">

      <!-- Prochaine location -->
      <div class="widget app-card next-resa" [class.empty]="!nextResa">
        <div class="widget-title">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            width="18" height="18">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
          </svg>
          Prochaine location de salle
        </div>

        @if (nextResa) {
          <div class="resa-body">
            <div class="resa-name">{{ nextResa.nomDemandeur }}</div>
            <div class="resa-dates">
              <span class="resa-badge from">Du</span>
              {{ nextResa.dateDebut | date:'EEE dd MMM yyyy':'':'fr' }}
              <span class="resa-sep">→</span>
              <span class="resa-badge to">Au</span>
              {{ nextResa.dateFin | date:'EEE dd MMM yyyy':'':'fr' }}
            </div>
            @if (nextResa.motif) {
              <div class="resa-motif">{{ nextResa.motif }}</div>
            }
            <div class="resa-meta">
              <span>{{ nextResa.email }}</span>
              @if (nextResa.telephone) { <span>· {{ nextResa.telephone }}</span> }
            </div>
            <div class="resa-countdown" [class.soon]="daysUntil <= 7">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                width="14" height="14">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              Dans {{ daysUntil }} jour{{ daysUntil > 1 ? 's' : '' }}
            </div>
          </div>
        } @else {
          <div class="resa-empty">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              width="32" height="32" opacity=".3">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <p>Aucune location à venir</p>
          </div>
        }

        <a routerLink="/admin/planning" class="widget-link">
          Voir le planning complet →
        </a>
      </div>

      <!-- Rappel adhérents -->
      <div class="widget app-card adherent-reminder" [class]="'widget app-card adherent-reminder status-' + adherentStatus">
        <div class="widget-title">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            width="18" height="18">
            <circle cx="9" cy="7" r="3"/>
            <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
            <circle cx="17" cy="7" r="3"/>
            <path d="M19 11c1.66 0 3 1.34 3 3v2"/>
          </svg>
          Mise à jour adhérents
        </div>

        <div class="reminder-icon">
          @if (adherentStatus === 'ok') {
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
              width="36" height="36"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>
          } @else if (adherentStatus === 'warn') {
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
              width="36" height="36"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          } @else if (adherentStatus === 'due') {
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
              width="36" height="36"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          } @else {
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              width="36" height="36"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          }
        </div>

        <div class="reminder-text">
          @if (adherentStatus === 'never') {
            <strong>Rappel annuel non configuré</strong>
            <span>Cliquez ci-dessous quand vous avez mis à jour la liste des adhérents.</span>
          } @else if (adherentStatus === 'ok') {
            <strong>Adhérents à jour</strong>
            <span>Dernière mise à jour il y a {{ adherentMonthsAgo }} mois
              @if (adherentLastUpdate) { ({{ adherentLastUpdate | date:'dd/MM/yyyy' }}) }
            </span>
          } @else if (adherentStatus === 'warn') {
            <strong>Mise à jour bientôt requise</strong>
            <span>Il y a {{ adherentMonthsAgo }} mois — pensez à renouveler la liste dans les prochaines semaines.</span>
          } @else {
            <strong>Mise à jour annuelle requise</strong>
            <span>Il y a {{ adherentMonthsAgo }} mois — la liste des adhérents doit être renouvelée.</span>
          }
        </div>

        <div class="reminder-actions">
          <button class="mark-done-btn" (click)="markAdherentsUpdated()">
            Marquer comme mis à jour
          </button>
          <a routerLink="/admin/adherents" class="widget-link">Gérer les adhérents →</a>
        </div>
      </div>

    </div>

    <!-- Post-its -->
    <div class="postits-section">
      <div class="postits-header">
        <div class="section-title">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            width="18" height="18">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
          Mémos & Todo
        </div>
        <button class="add-postit-btn" (click)="toggleAddForm()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
            width="15" height="15">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Nouveau post-it
        </button>
      </div>

      <!-- Formulaire d'ajout -->
      @if (showAddForm) {
        <div class="add-postit-form" [class]="'add-postit-form color-' + newColor">
          <textarea
            [(ngModel)]="newText"
            placeholder="Écrivez votre mémo ou tâche…"
            rows="4"
            (keydown.enter)="$event.preventDefault(); addPostIt()"
            autofocus></textarea>
          <div class="form-footer">
            <div class="color-picker">
              <button class="cp yellow" [class.selected]="newColor === 'yellow'" (click)="newColor = 'yellow'" title="Jaune"></button>
              <button class="cp green"  [class.selected]="newColor === 'green'"  (click)="newColor = 'green'"  title="Vert"></button>
              <button class="cp blue"   [class.selected]="newColor === 'blue'"   (click)="newColor = 'blue'"   title="Bleu"></button>
              <button class="cp pink"   [class.selected]="newColor === 'pink'"   (click)="newColor = 'pink'"   title="Rose"></button>
            </div>
            <div class="form-actions">
              <button class="cancel-btn" (click)="toggleAddForm()">Annuler</button>
              <button class="save-btn" (click)="addPostIt()" [disabled]="!newText.trim()">Ajouter</button>
            </div>
          </div>
        </div>
      }

      <!-- Grille de post-its -->
      @if (postIts.length > 0) {
        <div class="postits-grid">
          @for (p of postIts; track p.id) {
            <div class="postit" [class]="'postit color-' + p.color">
              @if (editingId === p.id) {
                <textarea class="postit-edit"
                  [(ngModel)]="editText"
                  (blur)="saveEdit(p)"
                  (keydown.escape)="cancelEdit()"
                  rows="4"></textarea>
              } @else {
                <div class="postit-text" (click)="startEdit(p)">{{ p.text }}</div>
              }
              <div class="postit-footer">
                <span class="postit-date">{{ p.createdAt | date:'dd/MM/yy' }}</span>
                <button class="postit-delete" (click)="deletePostIt(p.id)" title="Supprimer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    width="14" height="14">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                    <path d="M10 11v6M14 11v6"/>
                    <path d="M9 6V4h6v2"/>
                  </svg>
                </button>
              </div>
            </div>
          }
        </div>
      } @else if (!showAddForm) {
        <div class="postits-empty">
          <p>Aucun mémo pour l'instant — ajoutez votre premier post-it !</p>
        </div>
      }
    </div>
  `,
  styles: [`
    /* ── Header ── */
    .dash-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 28px;
    }
    .dash-header h2 { margin-bottom: 4px; color: #1e3d2f; font-size: 1.6rem; }
    .dash-date { color: #64748b; font-size: 0.9rem; margin: 0; text-transform: capitalize; }
    .dash-logo { height: 72px; width: auto; object-fit: contain; opacity: 0.9; }

    /* ── Notification bandeau ── */
    .notif-banner {
      display: flex;
      align-items: center;
      gap: 16px;
      background: #fffbeb;
      border: 1.5px solid #fbbf24;
      border-left: 5px solid #f59e0b;
      border-radius: 12px;
      padding: 16px 20px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }
    .notif-icon {
      width: 44px;
      height: 44px;
      background: #fef3c7;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #d97706;
      flex-shrink: 0;
    }
    .notif-content {
      flex: 1;
      min-width: 180px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .notif-content strong {
      font-size: 0.95rem;
      font-weight: 800;
      color: #92400e;
    }
    .notif-content span {
      font-size: 0.82rem;
      color: #b45309;
    }
    .notif-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #f59e0b;
      color: white;
      border-radius: 50px;
      padding: 9px 18px;
      font-size: 0.85rem;
      font-weight: 700;
      text-decoration: none;
      flex-shrink: 0;
      transition: background 0.18s;
    }
    .notif-btn:hover { background: #d97706; }

    /* ── Widgets row ── */
    .widgets-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 24px;
    }

    .widget {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      min-height: 220px;
    }

    .widget-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.78rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      color: #475569;
    }

    .widget-link {
      margin-top: auto;
      font-size: 0.82rem;
      font-weight: 700;
      color: #2d6a4f;
      text-decoration: none;
    }
    .widget-link:hover { text-decoration: underline; }

    /* ── Prochaine résa ── */
    .resa-body { display: flex; flex-direction: column; gap: 8px; flex: 1; }
    .resa-name { font-size: 1.25rem; font-weight: 800; color: #1e3d2f; }
    .resa-dates {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.88rem;
      color: #334155;
      flex-wrap: wrap;
    }
    .resa-badge {
      font-size: 0.65rem;
      font-weight: 800;
      text-transform: uppercase;
      padding: 2px 6px;
      border-radius: 4px;
      background: #edf5ee;
      color: #2d6a4f;
    }
    .resa-sep { color: #94a3b8; }
    .resa-motif {
      font-size: 0.88rem;
      color: #475569;
      font-style: italic;
      background: #f8fafc;
      border-left: 3px solid #2d6a4f;
      padding: 6px 10px;
      border-radius: 0 6px 6px 0;
    }
    .resa-meta { font-size: 0.8rem; color: #94a3b8; }
    .resa-countdown {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: #edf5ee;
      color: #2d6a4f;
      font-size: 0.8rem;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 20px;
      width: fit-content;
    }
    .resa-countdown.soon { background: #fef3c7; color: #b45309; }

    .resa-empty {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      color: #94a3b8;
      font-size: 0.88rem;
      font-style: italic;
    }

    /* ── Rappel adhérents ── */
    .adherent-reminder { transition: border-color 0.3s; }

    .status-ok    { border-left: 4px solid #2a9d8f; }
    .status-warn  { border-left: 4px solid #f4a261; }
    .status-due   { border-left: 4px solid #e63946; }
    .status-never { border-left: 4px solid #94a3b8; }

    .reminder-icon svg { display: block; }
    .status-ok    .reminder-icon { color: #2a9d8f; }
    .status-warn  .reminder-icon { color: #f4a261; }
    .status-due   .reminder-icon { color: #e63946; }
    .status-never .reminder-icon { color: #94a3b8; }

    .reminder-text {
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
    }
    .reminder-text strong { font-size: 1rem; color: #1e3d2f; }
    .reminder-text span { font-size: 0.85rem; color: #64748b; }

    .reminder-actions {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .mark-done-btn {
      background: #2d6a4f;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 9px 16px;
      font-size: 0.85rem;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.18s;
      text-align: center;
    }
    .mark-done-btn:hover { background: #1e4d38; }

    /* ── Post-its section ── */
    .postits-section { }

    .postits-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 1rem;
      font-weight: 800;
      color: #1e3d2f;
    }

    .add-postit-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      background: #2d6a4f;
      color: white;
      border: none;
      border-radius: 50px;
      padding: 8px 18px;
      font-size: 0.85rem;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.18s, transform 0.12s;
    }
    .add-postit-btn:hover { background: #1e4d38; transform: translateY(-1px); }

    /* Formulaire post-it */
    .add-postit-form {
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.08);
    }
    .add-postit-form textarea {
      width: 100%;
      border: none;
      background: transparent;
      font-size: 0.92rem;
      font-family: inherit;
      resize: none;
      outline: none;
      color: #1e293b;
      box-sizing: border-box;
    }
    .form-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
      flex-wrap: wrap;
      gap: 8px;
    }
    .color-picker { display: flex; gap: 8px; align-items: center; }
    .cp {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      border: 2px solid transparent;
      cursor: pointer;
      transition: transform 0.12s;
    }
    .cp.yellow { background: #fde68a; }
    .cp.green  { background: #a7f3d0; }
    .cp.blue   { background: #bfdbfe; }
    .cp.pink   { background: #fbcfe8; }
    .cp.selected { border-color: #1e293b; transform: scale(1.2); }

    .form-actions { display: flex; gap: 8px; }
    .cancel-btn {
      background: rgba(0,0,0,0.06);
      border: none;
      border-radius: 6px;
      padding: 6px 14px;
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
      color: #475569;
    }
    .save-btn {
      background: #1e293b;
      color: white;
      border: none;
      border-radius: 6px;
      padding: 6px 14px;
      font-size: 0.82rem;
      font-weight: 700;
      cursor: pointer;
    }
    .save-btn:disabled { opacity: 0.4; cursor: not-allowed; }

    /* Couleurs formulaire */
    .add-postit-form.color-yellow { background: #fef9c3; }
    .add-postit-form.color-green  { background: #dcfce7; }
    .add-postit-form.color-blue   { background: #dbeafe; }
    .add-postit-form.color-pink   { background: #fce7f3; }

    /* Grille post-its */
    .postits-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 14px;
    }

    .postit {
      border-radius: 12px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      min-height: 140px;
      box-shadow: 0 3px 10px rgba(0,0,0,0.07);
      transition: transform 0.15s, box-shadow 0.15s;
      position: relative;
    }
    .postit:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.1); }

    .postit.color-yellow { background: #fef9c3; }
    .postit.color-green  { background: #dcfce7; }
    .postit.color-blue   { background: #dbeafe; }
    .postit.color-pink   { background: #fce7f3; }

    .postit-text {
      flex: 1;
      font-size: 0.9rem;
      color: #1e293b;
      line-height: 1.5;
      white-space: pre-wrap;
      word-break: break-word;
      cursor: text;
    }

    .postit-edit {
      flex: 1;
      border: none;
      background: transparent;
      font-size: 0.9rem;
      font-family: inherit;
      color: #1e293b;
      line-height: 1.5;
      resize: none;
      outline: none;
      width: 100%;
    }

    .postit-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
    }
    .postit-date { font-size: 0.72rem; color: rgba(0,0,0,0.35); }
    .postit-delete {
      background: none;
      border: none;
      cursor: pointer;
      color: rgba(0,0,0,0.3);
      padding: 2px;
      border-radius: 4px;
      display: flex;
      transition: color 0.15s;
    }
    .postit-delete:hover { color: #e63946; }

    .postits-empty {
      text-align: center;
      padding: 32px;
      color: #94a3b8;
      font-style: italic;
      background: #f8fafc;
      border-radius: 12px;
      border: 2px dashed #e2e8f0;
    }

    /* ── Responsive ── */
    @media (max-width: 860px) {
      .widgets-row { grid-template-columns: 1fr; }
    }
    @media (max-width: 640px) {
      .dash-header h2 { font-size: 1.3rem; }
      .postits-header { flex-wrap: wrap; gap: 10px; }
      .add-postit-btn { width: 100%; justify-content: center; }
      .form-footer { flex-direction: column; gap: 10px; }
      .form-actions { justify-content: flex-end; }
    }
    @media (max-width: 480px) {
      .postits-grid { grid-template-columns: 1fr 1fr; }
    }
  `]
})
export class DashboardAdminComponent implements OnInit {
  todayLabel = '';
  nextResa: any = null;
  daysUntil = 0;
  demandesEnAttente = 0;

  adherentLastUpdate: Date | null = null;
  adherentMonthsAgo = 0;
  adherentStatus: 'never' | 'ok' | 'warn' | 'due' = 'never';

  postIts: PostIt[] = [];
  showAddForm = false;
  newText = '';
  newColor: PostIt['color'] = 'yellow';

  editingId: string | null = null;
  editText = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.buildTodayLabel();
    this.loadNextReservation();
    this.loadAdherentReminder();
    this.loadPostIts();
  }

  private buildTodayLabel(): void {
    this.todayLabel = new Date().toLocaleDateString('fr-FR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
  }

  loadNextReservation(): void {
    this.dataService.getAdminReservations().subscribe(resas => {
      const now = new Date();
      this.demandesEnAttente = resas.filter((r: any) => r.statut === 'EN_ATTENTE').length;
      const future = resas
        .filter(r => r.statut === 'CONFIRMEE' && new Date(r.dateDebut) > now)
        .sort((a: any, b: any) => new Date(a.dateDebut).getTime() - new Date(b.dateDebut).getTime());
      this.nextResa = future[0] ?? null;
      if (this.nextResa) {
        const diff = new Date(this.nextResa.dateDebut).getTime() - now.getTime();
        this.daysUntil = Math.ceil(diff / (1000 * 60 * 60 * 24));
      }
    });
  }

  loadAdherentReminder(): void {
    const raw = localStorage.getItem(STORAGE_ADHERENTS);
    if (!raw) {
      this.adherentStatus = 'never';
      return;
    }
    this.adherentLastUpdate = new Date(raw);
    const diffMs = Date.now() - this.adherentLastUpdate.getTime();
    this.adherentMonthsAgo = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30.44));
    if (this.adherentMonthsAgo >= 12) this.adherentStatus = 'due';
    else if (this.adherentMonthsAgo >= 10) this.adherentStatus = 'warn';
    else this.adherentStatus = 'ok';
  }

  markAdherentsUpdated(): void {
    localStorage.setItem(STORAGE_ADHERENTS, new Date().toISOString());
    this.loadAdherentReminder();
  }

  loadPostIts(): void {
    const raw = localStorage.getItem(STORAGE_POSTITS);
    this.postIts = raw ? JSON.parse(raw) : [];
  }

  private savePostIts(): void {
    localStorage.setItem(STORAGE_POSTITS, JSON.stringify(this.postIts));
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) { this.newText = ''; this.newColor = 'yellow'; }
  }

  addPostIt(): void {
    if (!this.newText.trim()) return;
    this.postIts.unshift({
      id: Date.now().toString(),
      text: this.newText.trim(),
      color: this.newColor,
      createdAt: new Date().toISOString()
    });
    this.savePostIts();
    this.newText = '';
    this.newColor = 'yellow';
    this.showAddForm = false;
  }

  deletePostIt(id: string): void {
    this.postIts = this.postIts.filter(p => p.id !== id);
    this.savePostIts();
  }

  startEdit(p: PostIt): void {
    this.editingId = p.id;
    this.editText = p.text;
  }

  saveEdit(p: PostIt): void {
    if (this.editText.trim()) {
      p.text = this.editText.trim();
      this.savePostIts();
    }
    this.editingId = null;
  }

  cancelEdit(): void {
    this.editingId = null;
  }
}
