using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using ToraBankDAL.Interfaces;
using ToraBankDAL.Models;
using iText.Layout.Properties;
using iText.IO.Font;
using iText.Kernel.Font;
using iText.IO.Image;

namespace ToraBankDAL
{
    public class DonateDL : IDonateDL
    {
        private readonly ToraBankContext _toraBankContext;
        private readonly UserDL _userDL;

        public DonateDL()
        {
            _toraBankContext = new ToraBankContext();
            _userDL = new UserDL();
        }

        public async Task<List<Donate>> GetAllDonates()
        {
            return await _toraBankContext.Donates
                 .Include(d => d.User)
                .Include(d => d.Rav).ToListAsync();
        }

        public async Task<List<Donate>> GetDonateByUserId(int userId)
        {
            return await _toraBankContext.Donates
                .Include(d => d.User)
                .Include(d => d.Rav)
                .Where(d => d.UserId == userId).ToListAsync();
        }

        public async Task<Donate> DeleteDonate(int id)
        {
            try
            {
                Donate currentDonateToDelete = await _toraBankContext.Donates.FirstOrDefaultAsync(item => item.DonateId == id);
                if (currentDonateToDelete == null)
                    throw new ArgumentException($"{id} is not found");

                _toraBankContext.Donates.Remove(currentDonateToDelete);
                await _toraBankContext.SaveChangesAsync();
                return currentDonateToDelete;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in DeleteDonate: {ex.Message}", ex);
            }
        }

        public async Task<Donate> GetDonateById(int id)
        {
            return await _toraBankContext.Donates
                .Include(d => d.User)
                .Include(d => d.Rav)
                .FirstOrDefaultAsync(item => item.DonateId == id);
        }

        public async Task<Donate> UpdateDonate(int id, Donate donate)
        {
            try
            {
                Donate currentDonateToUpdate = await _toraBankContext.Donates.FirstOrDefaultAsync(item => item.DonateId == id);
                if (currentDonateToUpdate == null)
                    throw new ArgumentException($"{id} is not found");

                currentDonateToUpdate.UserId = donate.UserId;
                currentDonateToUpdate.RavId = donate.RavId;
                currentDonateToUpdate.Sum = donate.Sum;
                currentDonateToUpdate.Date = donate.Date;
                currentDonateToUpdate.File = donate.File;

                await _toraBankContext.SaveChangesAsync();
                return currentDonateToUpdate;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in UpdateDonate: {ex.Message}", ex);
            }
        }

        public async Task<Donate> AddDonate(Donate donate)
        {
            try
            {
                await _toraBankContext.Donates.AddAsync(donate);
                await _toraBankContext.SaveChangesAsync();

                Donate newDonate = await _toraBankContext.Donates
                    .Include(d => d.User)
                    .Include(d => d.Rav)
                    .OrderByDescending(item => item.DonateId)
                    .FirstOrDefaultAsync();

                string receiptFileName = CreatePDFReceipt(newDonate);

                // עדכון שם הקובץ בתרומה ושמירה נוספת
                newDonate.File = receiptFileName;
                await _toraBankContext.SaveChangesAsync();

                return newDonate;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in AddDonate: {ex.Message}", ex);
            }
        }
        private string CreatePDFReceipt(Donate donate)
        {
            try
            {
                // Directory path to save PDF files
                string directoryPath = "C:\\Users\\tamar.e\\source\\repos\\finalProject\\ToraBank\\backend\\Receipts";

                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }

                string fileName = $"Receipt_{donate.DonateId}.pdf";
                // Full path of the PDF file
                string dest = Path.Combine(directoryPath, fileName);
                Console.WriteLine("Creating PDF at: " + dest);

                string fontPath = "C:\\Users\\tamar.e\\source\\repos\\finalProject\\ToraBank\\hebrew-font\\VarelaRound-Regular.ttf";
                string logoPath = "C:\\Users\\tamar.e\\source\\repos\\finalProject\\ToraBank\\backend\\pictures\\logo.png";

                PdfFont font = PdfFontFactory.CreateFont(fontPath, PdfEncodings.IDENTITY_H);

                // Initialize PDF writer
                using (PdfWriter writer = new PdfWriter(dest))
                {
                    // Initialize PDF document
                    using (PdfDocument pdf = new PdfDocument(writer))
                    {
                        // Initialize document
                        Document document = new Document(pdf);

                        // Add logo image
                        ImageData logoData = ImageDataFactory.Create(logoPath);
                        iText.Layout.Element.Image logoImage = new iText.Layout.Element.Image(logoData)
                            .SetAutoScale(false) // Do not automatically scale the image
                            .SetWidth(logoData.GetWidth() / 1) // Set width to 50% of original width
                            .SetHeight(logoData.GetHeight() / 1) // Set height to 50% of original height
                            .SetOpacity(0.9f) // Adjust opacity (0.0f = fully transparent, 1.0f = fully opaque)
                            .SetFixedPosition(0, 0); // Position at the bottom-left corner of the page

                        // Get the size of the page
                        float pageWidth = pdf.GetDefaultPageSize().GetWidth();
                        float pageHeight = pdf.GetDefaultPageSize().GetHeight();

                        // Position at the bottom-left corner
                        float xPosition = 0; // Align left
                        float yPosition = 0; // Align bottom

                        logoImage.SetFixedPosition(xPosition, yPosition);

                        document.Add(logoImage);

                        // Add content to the document
                        Paragraph header = new Paragraph($"{donate.DonateId} {ReverseString("קבלה בגין תרומה מס' ")}")
                            .SetTextAlignment(TextAlignment.CENTER)
                            .SetFontSize(20)
                            .SetFont(font);

                        document.Add(header);

                        // Add details about the donation
                        document.Add(new Paragraph($"{ReverseString(donate.User.Name)}" + ReverseString("לכבוד התורם/ת: מר/ת "))
                            .SetTextAlignment(TextAlignment.RIGHT)
                            .SetFont(font)
                            .SetFontSize(12)
                            .SetBaseDirection(BaseDirection.RIGHT_TO_LEFT));
                        document.Add(new Paragraph($"{ReverseString(donate.Rav.Name)} " + ReverseString("שם הרב: "))
                            .SetTextAlignment(TextAlignment.RIGHT)
                            .SetFont(font)
                            .SetFontSize(12)
                            .SetBaseDirection(BaseDirection.RIGHT_TO_LEFT));
                        document.Add(new Paragraph($"{donate.Sum} " + ReverseString("סכום התרומה: "))
                            .SetTextAlignment(TextAlignment.RIGHT)
                            .SetFont(font)
                            .SetFontSize(12)
                            .SetBaseDirection(BaseDirection.RIGHT_TO_LEFT));
                        document.Add(new Paragraph($"{donate.Date} " + ReverseString("תאריך התרומה: "))
                            .SetTextAlignment(TextAlignment.RIGHT)
                            .SetFont(font)
                            .SetFontSize(12)
                            .SetBaseDirection(BaseDirection.RIGHT_TO_LEFT));

                        // Close the document
                        document.Close();
                    }
                }

                Console.WriteLine("PDF created successfully at: " + dest);
                return fileName;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in CreatePDFReceipt: {ex.Message}");
                throw;
            }
        }





        private string ReverseString(string s)
        {
            char[] arr = s.ToCharArray();
            Array.Reverse(arr);
            return new string(arr);
        }
    }
}