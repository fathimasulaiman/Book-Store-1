import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { BOOK } from '../Book-Model';
import { OverallService } from '../overall.service';

@Component({
  selector: 'app-main-store',
  templateUrl: './main-store.component.html',
  styleUrls: ['./main-store.component.css'],
})
export class MainStoreComponent implements OnInit {
  showFiller = false;
  open = true;
  books: any;

  isAuthenticated = false;
  private authListenerSubs!: Subscription;
  constructor(
    private service: OverallService,
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.service.getBooks().subscribe((bos) => {
      this.books = bos;
    });
  }
  book!: BOOK;
  addToFavList(book: BOOK) {
    this.authService.addFavBooksToUser(book);
  }
  addToCart(book: BOOK) {
    console.log(book);

    this.authService.addBooksToUser(book);
    for (var i = 0; i < this.books.length; i++) {
      if (this.books[i] == book) {
        this.books[i].Stock = this.books[i].Stock - 1;
      }
    }
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.getisAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isauthenticated) => {
        this.isAuthenticated = isauthenticated;
      });
  }
}
