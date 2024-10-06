## Pendahuluan
Berikut adalah Web aplikasi untuk bagian server, Aplikasi web yang bertema News Portal

## End Point
Berikut adalah list Endpoint yang akan kita gunakan berserta deskripsi penggunaannya

| Method | Route               | Deskripsi                                                                                  |
| :----- | :----               | :---------------------------------------------------------------------                     |
| GET    | /add-user           | Untuk membuat user baru, hanya bisa diakses oleh user dengan role admin                    |  
| GET    | /public/article     | Menampilkan data `Article` yang dapat diakses public tanpa perlu login                     |
| POST   | /login              | Untuk login ke web aplikasi kita                                                           |
| GET    | /category           | Menampilkan data `Category`                                                                |
| POST   | /category           | Menambahkan data `Category` kedalam database                                               |
| DELETE | /category/:id       | Menghapus data `Category` dari database                                                    |
| PUT    | /category/:id       | Mengupdate data `Category` secara keseluruhan                                              |
| GET    | /article            | Menampilkan data `Article` user wajib login                                                |
| GET    | /article/:id        | Menampilkan data `Article` secara detail berdasarkan id `Article`, setelah user login      |
| POST   | /article            | Menambahkan data `Article` kedalam database                                                |
| DELETE | /article/:id        | Menghapus data `Article` dari database, (User hanya bisa menghapus articlenya sendiri)      |
| PUT    | /article/:id        | Mengupdate keseluruhan data `Article` dari database, (berlaku untuk articlenya sendiri)     |
| PATCH  | /article/:id        | Mengupdate satu data `Article` dari database, (berlaku untuk articlenya sendiri)            |

## TAMPILAN SETIAP END POINT PADA POSTMAN

# GET /add-user 

 => Role Admin ==== akan tampil pesan "Success Create New User" seperti gambar berikut :
![alt text](Postmanimage/image.png)

 => Role Staff ==== akan tampil pesan "You dont have Access" seperti gambar berikut :
![alt text](Postmanimage/image-1.png)

# GET /public/article  
 => Berhasil menampilkan article "Data yang akan ditampilkan postman"
 ![alt text](Postmanimage/image-2.png)
 
 => Gagal menampilkan article "Data yang dibaca tidak sesuai/ditemukan" maka akan muncul pesan "Internal Sevrer Error"
 ![alt text](Postmanimage/image-3.png)

# POST /login 
 => Berhasil menampilkan pesan ""Success Login with *emailuser*" dan token yang dapat digunakan. seperti gambar berikut :
 ![alt text](Postmanimage/image-4.png)
 
 => Gagal login menampilkan pesan "Invalid E-mail or password" seperti gambar berikut :
 ![alt text](Postmanimage/image-5.png)

 # GET /category
 => Berhasil menampilkan data Category. seperti gambar berikut :
 ![alt text](Postmanimage/image-6.png)

 => Gagal read Category. Data yang tidak sesuai/tidak ditemukan.
 ![alt text](Postmanimage/image-7.png)

 #  POST /category 
 => Berhasil manampilan pesan "Success create categories"
![alt text](Postmanimage/image-9.png)

 => Gagal karena Role user bukan Admin
 ![alt text](Postmanimage/image-8.png)

 => Gagal karena name tidak diisi value. Menampilkan pesan "Category name is required"
![alt text](Postmanimage/image-10.png)

# DELETE /category/:id 
 => Berhasil menampilkan pesan "Success Delete Product with id ${id}" 
![alt text](Postmanimage/image-11.png)

 => Gagal karena id dari category tidak ditemukan. Menampilkan pesan "Article Not Found"
 ![alt text](Postmanimage/image-12.png)

#  PUT /category/:id  
 => Berhasil menampilkan pesan "Success edit Category with id ${id}"
 ![alt text](Postmanimage/image-13.png)

 => Gagal karena id dari category tidak ditemukan. Menampilkan pesan "Article Not Found"
 ![alt text](Postmanimage/image-14.png)

 => Gagal karena name tidak diisi value. Menampilkan pesan "Category name is required"
 ![alt text](Postmanimage/image-15.png)

# GET /article 
 => Berhasil membaca article dan menampilkan data article. 
 ![alt text](Postmanimage/image-16.png)
 
 => Gagal read Category. Data yang tidak sesuai/tidak ditemukan.
 ![alt text](Postmanimage/image-17.png)

#  GET /article/:id 
 => Berhasil menampilkan data article berdasarkan id yang dicari. Menampilkan pesan "Success read Article with id ${id}"
    dan menampilkan data article dari id tersebut.
![alt text](Postmanimage/image-18.png)

 => Gagal menampilkan data article karena id tidak ditemukan. Menampilkan pesan "Article Not Found"
 ![alt text](Postmanimage/image-19.png)

#  POST /article  
 => Berhasil menambahkan Article. Menampilkan pesan "Success Add Article".
 ![alt text](Postmanimage/image-20.png)

 => Gagal menambahkan article karena tidak mengisi title,content,imgUrl,categoryId. Menampilkan pesan "Title is required"/"Content is required"/"imgUrl is required"/"CategoryId is required".
 ![alt text](Postmanimage/image-21.png)

 # DELETE /article/:id   
  => Berhasil menghapus article miliknya sendiri. Menampilkan pesan "Success Delete Article with id ${id}" 
  ![alt text](Postmanimage/image-22.png)

  => Berhasil menghapus dengan Role "Admin". Menampilkan pesan "Success Delete Article with id ${id}"
  ![alt text](Postmanimage/image-23.png)

  => Gagal menghapus karena id article tidak ditemukan. Menampilkan pesan "Article Not Found".
  ![alt text](Postmanimage/image-24.png)

  => Gagal menghapus karena Role "Staff" dan menghapus id article yang bukan miliknya. Menampilkan pesan "You dont have Access".
  ![alt text](Postmanimage/image-25.png)

# PUT /article/:id  
 => Berhasil edit article miliknya sendiri role "Staff". Menampilkan pesan "Success Update Article with id ${id}".
 ![alt text](Postmanimage/image-26.png)

 => Berhasil edit article dengan role "Admin". Menampilkan pesan "Success Update Article with id ${id}".
 ![alt text](Postmanimage/image-27.png)

 => Gagal edit article karena id tidak ditemukan. Menampilkan pesan "Article Not Found" jika article bukan miliknya pesan yang  muncul "You dont have Access"  
 ![alt text](Postmanimage/image-28.png)

 # PATCH /article/:id 
  => Berhasil editImgUrl article miliknya sendiri role "Staff". Menampilkan pesan "Success Update Article with id ${id}".
 ![alt text](Postmanimage/image-31.png)

 => Berhasil editImgUrl article dengan role "Admin". Menampilkan pesan "Success Update Article with id ${id}".
 ![alt text](Postmanimage/image-30.png)

 => Gagal editImgUrl article karena id tidak ditemukan. Menampilkan pesan "Article Not Found" jika article bukan miliknya pesan yang  muncul "You dont have Access"  
 ![alt text](Postmanimage/image-29.png)

# CONTACT 
 github : RinaScode

# AKSES ROLE

# ADMIN
rina@mail.com
12345

# STAFF 
caca@mail.com
12345

## LINK DEPLOY
https://server.rinasismita.online/public/article