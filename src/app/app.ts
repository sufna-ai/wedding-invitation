import {
  Component,
  OnDestroy,
  OnInit,
  Inject,
  PLATFORM_ID,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements OnInit, OnDestroy {
  @ViewChild('bgMusic') bgMusic!: ElementRef<HTMLAudioElement>;

  opened = false;
  isBrowser = false;

  timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  comments = [
    {
      name: 'A well wisher',
      message: '✨ May Allah bless your marriage with love and barakah.',
    },
    {
      name: 'Family',
      message: '🤍 Wishing you both a lifetime of happiness and peace.',
    },
    {
      name: 'Close Friend',
      message: '🌹 Congratulations! May your love story be as beautiful as a blooming rose.',
    },
    {
      name: 'Colleague',
      message: '🎊 Wishing you endless joy and prosperity in your new journey together.',
    },
    {
      name: 'Neighbor',
      message: '🏡 May your home be filled with love, laughter, and countless happy memories.',
    },
    {
      name: 'Relative',
      message: '👨‍👩‍👧‍👦 May Allah grant you pious children and a blessed family life.',
    },
  ];

  form = {
    name: '',
    message: '',
  };

  private intervalId: any;

  calendarUrl =
    'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding%20Invitation%20%7C%20Fathima%20Sufna%20%26%20Shahul%20Hameed&dates=20260412/20260413&details=With%20the%20blessings%20of%20Allah%2C%20you%20are%20warmly%20invited%20to%20celebrate%20the%20wedding%20of%20Fathima%20Sufna%20and%20Shahul%20Hameed.';

  mapsUrl =
    'https://www.google.com/maps/place/XV6W%2B8G3+Hooriya+Auditorium+Puthentheru,+Puthantheru,+Thanalur,+Kerala+676307/data=!4m2!3m1!1s0x3ba7ad85735a1793:0x677c7435f1e15df6!18m1!1e1?utm_source=mstt_1&entry=gps&coh=192189&g_ep=CAESBzI2LjExLjYYACDXggMqlAEsOTQyNjc3MjcsOTQyOTIxOTUsOTQyOTk1MzIsMTAwNzk2NDk4LDEwMDc5Nzc2MSwxMDA3OTY1MzUsOTQyODQ0OTYsOTQyODA1NzYsOTQyMDczOTQsOTQyMDc1MDYsOTQyMDg1MDYsOTQyMTg2NTMsOTQyMjk4MzksOTQyNzUxNjgsOTQyNzk2MTksMTAwNzk2MTg2QgJJTg%3D%3D&skid=37b2b9cf-7a85-4c6d-8923-08aa14315ab3';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.updateCountdown();

    if (this.isBrowser) {
      this.intervalId = setInterval(() => this.updateCountdown(), 1000);
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  excitement = 50;

getExcitement() {
  if (this.excitement < 25)
    return { emoji: "🙂", text: "Not Excited" };

  if (this.excitement < 50)
    return { emoji: "😊", text: "Happy" };

  if (this.excitement < 75)
    return { emoji: "😍", text: "Very Excited" };

  return { emoji: "👑", text: "Royal Blessing" };
}

  openInvitation(): void {
    this.opened = true;

    if (this.isBrowser) {
      setTimeout(() => {
        const audio = this.bgMusic?.nativeElement;
        if (!audio) return;

        audio.volume = 0;

        audio.play().catch(() => {});

        const fade = setInterval(() => {
          if (audio.volume < 0.4) {
            audio.volume = Math.min(audio.volume + 0.05, 0.4);
          } else {
            clearInterval(fade);
          }
        }, 200);
      }, 250);
    }
  }

  updateCountdown(): void {
    const targetDate = new Date('2026-04-12T00:00:00+05:30').getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      this.timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return;
    }

    this.timeLeft = {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  submitWish(): void {
    const name = this.form.name.trim();
    const message = this.form.message.trim();

    if (!name || !message) return;

    this.comments.unshift({ name, message });
    this.form = { name: '', message: '' };
  }
}