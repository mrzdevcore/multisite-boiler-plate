/**
 * critical scripts
 *
 * Put here all critical staf
 *
 * do not include any library, use vanilla typescript
 */

class Critical {
  public executeOnLoad(): void {
    console.info('this so critical that you are forbidden to use library');
  }
}

window.onload = () => new Critical().executeOnLoad();
